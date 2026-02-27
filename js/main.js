'use strict';
/* global Monogatari */
/* global monogatari */

/**
 * =============================================================================
 * This is the file where you should put all your custom JavaScript code,
 * depending on what you want to do, there are 3 different places in this file
 * where you can add code.
 *
 * 1. Outside the $_ready function: At this point, the page may not be fully
 *    loaded yet, however you can interact with Monogatari to register new
 *    actions, components, labels, characters, etc.
 *
 * 2. Inside the $_ready function: At this point, the page has been loaded, and
 *    you can now interact with the HTML elements on it.
 *
 * 3. Inside the init function: At this point, Monogatari has been initialized,
 *    the event listeners for its inner workings have been registered, assets
 *    have been preloaded (if enabled) and your game is ready to be played.
 *
 * You should always keep the $_ready function as the last thing on this file.
 * =============================================================================
 **/

const { $_ready, $_ } = Monogatari;

// CSS lazy loader
const screenCSS = {
	game: [
		'./style/text-box.css',
		'./style/character-position.css',
		'./style/character-actions.css',
		'./style/choice-stats.css'
	],
	settings: ['./style/settings.css']
};
const loadedScreens = new Set();

function activateCSS(screen) {
	if (loadedScreens.has(screen) || !screenCSS[screen]) return;
	loadedScreens.add(screen);
	return Promise.all(screenCSS[screen].map(href => {
		return new Promise(resolve => {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = href;
			link.onload = resolve;
			link.onerror = resolve;
			document.head.appendChild(link);
		});
	}));
}

// 1. Outside the $_ready function:

// Customize main screen template with title, subtitle, and sakura petals
monogatari.component ('main-screen').template (() => {
	return `
		<div class="main-screen__overlay"></div>
		<div class="sakura-container">
			<div class="petal petal--1"></div>
			<div class="petal petal--2"></div>
			<div class="petal petal--3"></div>
			<div class="petal petal--4"></div>
			<div class="petal petal--5"></div>
			<div class="petal petal--6"></div>
			<div class="petal petal--7"></div>
			<div class="petal petal--8"></div>
			<div class="petal petal--9"></div>
			<div class="petal petal--10"></div>
			<div class="petal petal--11"></div>
			<div class="petal petal--12"></div>
		</div>
		<div class="main-screen__content">
			<h1 data-content="title">사쿠라 학원</h1>
			<p data-content="subtitle">벚꽃이 피는 봄날의 이야기</p>
		</div>
	`;
});

$_ready (() => {
	// 2. Inside the $_ready function:

	monogatari.init ('#monogatari').then (() => {
		// 3. Inside the init function:

		// 로딩 화면이 아직 보이는 동안 게임 CSS 활성화
		activateCSS('game');

		// 설정 화면은 진입 시에만 로딩 (MutationObserver)
		const settingsEl = document.querySelector('[data-screen="settings"]');
		if (settingsEl) {
			new MutationObserver(() => {
				if (settingsEl.classList.contains('active')) {
					activateCSS('settings');
				}
			}).observe(settingsEl, { attributes: true, attributeFilter: ['class'] });
		}

		ChoiceStats.init();
		ChoiceStats.installHook();
		ChoiceStats.installPreviewObserver();
	});
});
