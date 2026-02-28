const UISounds = (function () {
	'use strict';

	var audio = null;
	var soundPath = 'assets/sounds/Select.mp3';

	function init () {
		audio = new Audio(soundPath);
		audio.preload = 'auto';
	}

	function play () {
		if (!audio) return;
		audio.volume = monogatari.preference('Volume').Sound;
		audio.currentTime = 0;
		audio.play().catch(function () {});
	}

	function installHook () {
		document.addEventListener('pointerdown', function (e) {
			if (!e.isTrusted) return;

			// 선택지 버튼
			if (e.target.closest('[data-choice]')) { play(); return; }
			// 메인 메뉴 버튼
			if (e.target.closest('[data-action]')) { play(); return; }
			// 퀵 메뉴 버튼
			if (e.target.closest('[data-component="quick-menu"] [data-action]')) { play(); return; }
			// 세이브/로드 슬롯
			if (e.target.closest('[data-slot]')) { play(); return; }
		}, true); // capture phase — ChoiceStats보다 먼저 실행
	}

	return { init: init, installHook: installHook };
})();
