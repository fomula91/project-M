#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(PROJECT_ROOT, 'assets');
const KEY_FILE = path.join(__dirname, '.asset-key');
const MANIFEST_FILE = path.join(ASSETS_DIR, 'manifest.enc.json');

const TARGET_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.mp3']);

const MIME_TYPES = {
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.mp3': 'audio/mpeg',
};

function getOrCreateKey() {
	// 1. 환경변수 ASSET_ENCRYPTION_KEY가 있으면 사용 (Vercel 빌드용)
	if (process.env.ASSET_ENCRYPTION_KEY) {
		console.log('환경변수 키 사용: ASSET_ENCRYPTION_KEY');
		return Buffer.from(process.env.ASSET_ENCRYPTION_KEY, 'hex');
	}
	// 2. 로컬 키 파일이 있으면 사용
	if (fs.existsSync(KEY_FILE)) {
		const hex = fs.readFileSync(KEY_FILE, 'utf8').trim();
		console.log('기존 키 사용:', KEY_FILE);
		return Buffer.from(hex, 'hex');
	}
	// 3. 둘 다 없으면 새 키 생성
	const key = crypto.randomBytes(32);
	fs.writeFileSync(KEY_FILE, key.toString('hex'), 'utf8');
	console.log('새 키 생성:', KEY_FILE);
	return key;
}

function collectAssetFiles(dir, fileList = []) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			// icons 디렉토리는 제외 (PWA 아이콘은 암호화 불필요)
			if (entry.name === 'icons') continue;
			collectAssetFiles(fullPath, fileList);
		} else if (entry.isFile()) {
			const ext = path.extname(entry.name).toLowerCase();
			if (TARGET_EXTENSIONS.has(ext)) {
				fileList.push(fullPath);
			}
		}
	}
	return fileList;
}

function encryptFile(filePath, key) {
	const original = fs.readFileSync(filePath);
	const compressed = zlib.gzipSync(original);

	const iv = crypto.randomBytes(12);
	const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
	const encrypted = Buffer.concat([cipher.update(compressed), cipher.final()]);
	const authTag = cipher.getAuthTag(); // 16 bytes

	// [IV(12)] [ciphertext] [authTag(16)]
	return Buffer.concat([iv, encrypted, authTag]);
}

function main() {
	const deleteOriginals = process.argv.includes('--delete-originals');

	console.log('=== 에셋 암호화 시작 ===');
	if (deleteOriginals) console.log('[옵션] 암호화 후 원본 파일 삭제');
	console.log('');

	const key = getOrCreateKey();
	const assetFiles = collectAssetFiles(ASSETS_DIR);

	if (assetFiles.length === 0) {
		console.log('암호화할 에셋 파일이 없습니다.');
		return;
	}

	console.log(`대상 파일: ${assetFiles.length}개\n`);

	const manifest = {};
	let totalOriginal = 0;
	let totalEncrypted = 0;

	for (const filePath of assetFiles) {
		const relativePath = path.relative(PROJECT_ROOT, filePath);
		const ext = path.extname(filePath).toLowerCase();
		const encPath = filePath + '.enc';
		const relativeEncPath = relativePath + '.enc';

		const encData = encryptFile(filePath, key);
		fs.writeFileSync(encPath, encData);

		const originalSize = fs.statSync(filePath).size;
		const encSize = encData.length;
		totalOriginal += originalSize;
		totalEncrypted += encSize;

		manifest[relativePath] = {
			enc: relativeEncPath,
			mime: MIME_TYPES[ext] || 'application/octet-stream',
		};

		const ratio = ((encSize / originalSize) * 100).toFixed(1);
		console.log(`  ${relativePath} → ${relativeEncPath} (${ratio}%)`);
	}

	fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), 'utf8');

	const totalRatio = ((totalEncrypted / totalOriginal) * 100).toFixed(1);
	console.log(`\n=== 완료 ===`);
	console.log(`파일 수: ${assetFiles.length}`);
	console.log(`원본 총 크기: ${(totalOriginal / 1024 / 1024).toFixed(1)} MB`);
	console.log(`암호화 총 크기: ${(totalEncrypted / 1024 / 1024).toFixed(1)} MB (${totalRatio}%)`);
	console.log(`매니페스트: ${path.relative(PROJECT_ROOT, MANIFEST_FILE)}`);
	console.log(`\n[Service Worker용 키 (hex)]`);
	console.log(key.toString('hex'));

	// --delete-originals: manifest에 등록된 원본 파일만 삭제
	if (deleteOriginals) {
		console.log('\n=== 원본 파일 삭제 ===');
		let deleted = 0;
		for (const relativePath of Object.keys(manifest)) {
			const absPath = path.join(PROJECT_ROOT, relativePath);
			if (fs.existsSync(absPath)) {
				fs.unlinkSync(absPath);
				deleted++;
			}
		}
		console.log(`삭제된 원본 파일: ${deleted}개`);
	}
}

main();
