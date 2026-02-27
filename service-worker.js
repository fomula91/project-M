'use strict';

// The name of your game, no spaces or special characters.
const name = 'Monogatari';

// The version of the cache, changing this will force everything to be cached
// again.
const version = '0.3.0';

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
				if (key !== `${name}-v${version}`) {
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