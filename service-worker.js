'use strict';

// The name of your game, no spaces or special characters.
const name = 'Monogatari';

// The version of the cache, changing this will force everything to be cached
// again.
const version = '0.6.0';

// ── Asset Decryption Config ──
// 이 키는 tools/encrypt-assets.js 실행 후 출력되는 hex 문자열로 교체해야 합니다.
const ASSET_KEY_HEX = '106c7143e29939f38842c5cc8bcfa0a7d7032f3d797d162c6ca12d179ae8fbbf';
const ENCRYPTED_CACHE = `${name}-encrypted-v${version}`;
const ENC_DEBUG = false; // 배포 환경 디버깅 시 true로 변경

const files = [

	'/',

	// General Files
	'manifest.json',

	// Engine Files
	'engine/core/monogatari.css',
	'engine/core/monogatari.js',
	'engine/debug/debug.js',

	// HTML Files
	'index.html',

	// Style Sheets
	'style/main.css',
	'style/text-box.css',
	'style/character-position.css',
	'style/character-actions.css',
	'style/choice-stats.css',
	'style/settings.css',

	// JavaScript Files
	'js/options.js',
	'js/storage.js',
	'js/script.js',
	'js/main.js',
	'js/scripts/day1/day1-common.js',
	'js/scripts/day1/day1-sora.js',
	'js/scripts/day1/day1-hana.js',
	'js/scripts/day2/day2-common.js',
	'js/scripts/day2/day2-sora.js',
	'js/scripts/day2/day2-hana.js',
	'js/scripts/day3/day3-common.js',
	'js/scripts/day3/day3-sora.js',
	'js/scripts/day3/day3-hana.js',
	'js/scripts/day3/day3-together.js',
	'js/scripts/day4/day4-common.js',
	'js/scripts/day4/day4-sora.js',
	'js/scripts/day4/day4-hana.js',
	'js/scripts/day4/day4-together.js',
	'js/scripts/day5/day5-sora.js',
	'js/scripts/day5/day5-hana.js',
	'js/scripts/day5/day5-together.js',
	'js/helpers/transitions.js',
	'js/choice-stats.js',
	'js/affinity-hint.js',

	// App Images
	'favicon.ico',
	'assets/icons/icon_48x48.png',
	'assets/icons/icon_60x60.png',
	'assets/icons/icon_70x70.png',
	'assets/icons/icon_76x76.png',
	'assets/icons/icon_96x96.png',
	'assets/icons/icon_120x120.png',
	'assets/icons/icon_128x128.png',
	'assets/icons/icon_150x150.png',
	'assets/icons/icon_152x152.png',
	'assets/icons/icon_167x167.png',
	'assets/icons/icon_180x180.png',
	'assets/icons/icon_192x192.png',
	'assets/icons/icon_310x150.png',
	'assets/icons/icon_310x310.png',
	'assets/icons/icon_512x512.png'
];

// ── Asset Manifest (loaded at runtime) ──
let assetManifest = null;

async function loadManifest () {
	if (assetManifest) return assetManifest;
	try {
		const res = await fetch('/assets/manifest.enc.json');
		if (res.ok) {
			assetManifest = await res.json();
		}
	} catch (e) {
		// manifest가 없으면 암호화 미적용 상태 → 원본 그대로 서빙
	}
	return assetManifest;
}

async function importDecryptionKey () {
	const keyBytes = new Uint8Array(
		ASSET_KEY_HEX.match(/.{2}/g).map(byte => parseInt(byte, 16))
	);
	return crypto.subtle.importKey(
		'raw',
		keyBytes,
		{ name: 'AES-GCM' },
		false,
		['decrypt']
	);
}

let _cryptoKey = null;
async function getCryptoKey () {
	if (!_cryptoKey) {
		_cryptoKey = await importDecryptionKey();
	}
	return _cryptoKey;
}

async function decryptAsset (encryptedBuffer) {
	const data = new Uint8Array(encryptedBuffer);

	// [IV(12)] [ciphertext] [authTag(16)]
	const iv = data.slice(0, 12);
	const authTag = data.slice(data.length - 16);
	const ciphertext = data.slice(12, data.length - 16);

	// Web Crypto의 AES-GCM은 ciphertext + authTag를 연결하여 전달
	const combined = new Uint8Array(ciphertext.length + authTag.length);
	combined.set(ciphertext);
	combined.set(authTag, ciphertext.length);

	const key = await getCryptoKey();
	const decrypted = await crypto.subtle.decrypt(
		{ name: 'AES-GCM', iv: iv },
		key,
		combined
	);

	// gzip 해제
	const ds = new DecompressionStream('gzip');
	const writer = ds.writable.getWriter();
	writer.write(new Uint8Array(decrypted));
	writer.close();

	const reader = ds.readable.getReader();
	const chunks = [];
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		chunks.push(value);
	}

	let totalLength = 0;
	for (const chunk of chunks) totalLength += chunk.length;
	const result = new Uint8Array(totalLength);
	let offset = 0;
	for (const chunk of chunks) {
		result.set(chunk, offset);
		offset += chunk.length;
	}

	return result.buffer;
}

async function handleEncryptedAsset (request) {
	const url = new URL(request.url);
	const assetPath = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;

	const manifest = await loadManifest();
	if (!manifest || !manifest[assetPath]) {
		if (ENC_DEBUG) console.warn(`[ENC] not in manifest: ${assetPath}`);
		return null;
	}

	// 복호화된 캐시 확인
	const cache = await caches.open(ENCRYPTED_CACHE);
	const cached = await cache.match(request);
	if (cached) {
		if (ENC_DEBUG) console.log(`[ENC] cache hit: ${assetPath}`);
		return cached;
	}

	const entry = manifest[assetPath];
	const encUrl = new URL('/' + entry.enc, url.origin).href;

	if (ENC_DEBUG) console.log(`[ENC] fetching: ${encUrl}`);

	const encResponse = await fetch(encUrl);
	if (!encResponse.ok) {
		if (ENC_DEBUG) console.warn(`[ENC] fetch failed (${encResponse.status}): ${encUrl}`);
		return null;
	}

	const encBuffer = await encResponse.arrayBuffer();
	const decryptedBuffer = await decryptAsset(encBuffer);

	if (ENC_DEBUG) console.log(`[ENC] decrypted: ${assetPath} (${encBuffer.byteLength} → ${decryptedBuffer.byteLength})`);

	const response = new Response(decryptedBuffer, {
		status: 200,
		headers: {
			'Content-Type': entry.mime,
			'Cache-Control': 'public, max-age=604800, immutable',
		},
	});

	// 복호화 결과 캐시에 저장
	cache.put(request, response.clone());

	return response;
}

self.addEventListener ('install', (event) => {
	self.skipWaiting ();
	event.waitUntil (
		caches.open (`${name}-v${version}`).then ((cache) => {
			return cache.addAll (files);
		})
	);
});

self.addEventListener ('activate', (event) => {
	event.waitUntil (
		caches.keys ().then ((keyList) => {
			return Promise.all (keyList.map ((key) => {
				if (key !== `${name}-v${version}` && key !== ENCRYPTED_CACHE) {
					return caches.delete (key);
				}
			}));
		})
	);
	return self.clients.claim ();
});

self.addEventListener ('fetch', (event) => {

	if (event.request.method !== 'GET') {
		return;
	}

	const url = new URL(event.request.url);

	// assets/ 경로이고 icons가 아닌 경우 암호화 에셋 처리 시도
	if (url.pathname.startsWith('/assets/') &&
		!url.pathname.startsWith('/assets/icons/') &&
		!url.pathname.endsWith('.enc') &&
		!url.pathname.endsWith('.json') &&
		ASSET_KEY_HEX !== 'REPLACE_WITH_HEX_KEY') {

		event.respondWith(
			handleEncryptedAsset(event.request).then((decrypted) => {
				if (decrypted) return decrypted;
				// 복호화 실패 시 원본 폴백
				if (ENC_DEBUG) console.warn(`[ENC] fallback to original: ${url.pathname}`);
				return caches.match(event.request).then((cached) => {
					return cached || fetch(event.request);
				});
			}).catch((err) => {
				if (ENC_DEBUG) console.error(`[ENC] error: ${url.pathname}`, err);
				return caches.match(event.request).then((cached) => {
					return cached || fetch(event.request);
				});
			})
		);
		return;
	}

	event.respondWith (
		caches.match (event.request).then ((cached) => {
			function fetchedFromNetwork (response) {
				const cacheCopy = response.clone ();

				caches.open (`${name}-v${version}`).then (function add (cache) {
					cache.put (event.request, cacheCopy);
				});
				return response;
			}

			function unableToResolve () {
				return new Response (`
					<!DOCTYPE html><html lang=en><title>Bad Request</title><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><style>body,html{width:100%;height:100%}body{text-align:center;color:#545454;margin:0;display:flex;justify-content:center;align-items:center;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Fira Sans","Droid Sans","Helvetica Neue",sans-serif}h1,h2{font-weight:lighter}h1{font-size:4em}h2{font-size:2em}</style><div><h1>Service Unavailable</h1><h2>Sorry, the server is currently unavailable or under maintenance, try again later.</h2></div>
				`, {
					status: 503,
					statusText: 'Service Unavailable',
					headers: new Headers ({
						'Content-Type': 'text/html'
					})
				});
			}

			const networked = fetch (event.request)
				.then (fetchedFromNetwork, unableToResolve)
				.catch (unableToResolve);

			return cached || networked;
		})
	);
});
