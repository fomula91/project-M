/**
 * =============================================================================
 * Affinity Hint Module
 * 호감도 변화 시 화면에 미묘한 알림 오버레이를 표시
 * =============================================================================
 */
const AffinityHint = (function () {
	'use strict';

	var CONFIG = {
		sora: { icon: '✧', text: '소라의 마음이 가까워진 것 같다.', cls: 'affinity-hint--sora' },
		hana: { icon: '✨', text: '하나의 마음이 가까워진 것 같다.', cls: 'affinity-hint--hana' }
	};

	var TOTAL_DURATION = 1800;
	var EXIT_DURATION = 400;

	function show (character) {
		var cfg = CONFIG[character];
		if (!cfg) return;

		var container = document.querySelector('game-screen');
		if (!container) return;

		var el = document.createElement('div');
		el.className = 'affinity-hint ' + cfg.cls;
		el.innerHTML = '<span class="affinity-hint__icon">' + cfg.icon + '</span>' +
			'<span class="affinity-hint__text">' + cfg.text + '</span>';

		container.appendChild(el);

		setTimeout(function () {
			el.classList.add('affinity-hint--exit');
		}, TOTAL_DURATION - EXIT_DURATION);

		setTimeout(function () {
			if (el.parentNode) el.parentNode.removeChild(el);
		}, TOTAL_DURATION);
	}

	return { show: show };
})();
