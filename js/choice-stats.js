/**
 * =============================================================================
 * Choice Statistics Module (API Proxy 연동)
 * 텔테일 게임 스타일 "플레이어의 X%가 이 선택을 했습니다" 표시
 * =============================================================================
 */
const ChoiceStats = (function () {
	'use strict';

	const DISPLAY_DURATION = 2500;
	const API_TIMEOUT = 3000;
	const PREVIEW_DELAY = 700;

	const TRACKED_SCENES = {
		'Day1UnknownHint': true,
		'MorningEvent': true,
		'LunchTime': true,
		'Day2Morning': true,
		'Day2ScienceLab': true,
		'Day3BothHigh': true,
		'Day3SoraClimax': true,
		'Day3HanaClimax': true,
		'Day4Evening': true,
		'Day5SoraConfess2': true,
		'Day5HanaConfess2': true
	};

	let isReplayingClick = false;
	let isPreviewActive = false;
	let observerInstalled = false;

	function init () {
		console.log('[ChoiceStats] Initialized (API proxy mode).');
	}

	function getCurrentSceneId () {
		try {
			const label = monogatari.state('label');
			return TRACKED_SCENES[label] ? label : null;
		} catch (e) {
			return null;
		}
	}

	function timeout (ms) {
		return new Promise(function (_, reject) {
			setTimeout(function () { reject(new Error('timeout')); }, ms);
		});
	}

	async function recordVoteAndGetStats (sceneId, choiceKey) {
		if (!navigator.onLine) {
			console.warn('[ChoiceStats] Offline, skipping API call.');
			return null;
		}

		try {
			const response = await Promise.race([
				fetch('/api/vote', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ scene_id: sceneId, choice_key: choiceKey })
				}),
				timeout(API_TIMEOUT)
			]);

			if (!response.ok) {
				console.warn('[ChoiceStats] Vote API error:', response.status);
				return null;
			}
			return await response.json();
		} catch (err) {
			console.warn('[ChoiceStats] API call failed:', err.message);
			return null;
		}
	}

	async function getSceneStats (sceneId) {
		if (!navigator.onLine) return null;

		try {
			var response = await Promise.race([
				fetch('/api/stats?scene_id=' + encodeURIComponent(sceneId)),
				timeout(API_TIMEOUT)
			]);

			if (!response.ok) {
				console.warn('[ChoiceStats] Stats API error:', response.status);
				return null;
			}
			return await response.json();
		} catch (err) {
			console.warn('[ChoiceStats] Stats query failed:', err.message);
			return null;
		}
	}

	function calculatePercentages (stats) {
		const total = stats.reduce(function (sum, s) { return sum + Number(s.vote_count); }, 0);
		if (total === 0) {
			return stats.map(function (s) {
				return { choice_key: s.choice_key, percent: 0 };
			});
		}
		return stats.map(function (s) {
			return {
				choice_key: s.choice_key,
				percent: Math.round((Number(s.vote_count) / total) * 100)
			};
		});
	}

	function displayStats (stats, selectedKey, container) {
		return new Promise(function (resolve) {
			const percentages = calculatePercentages(stats);
			const buttons = container.querySelectorAll('[data-choice]');

			container.classList.add('choice-stats-active');

			buttons.forEach(function (btn) {
				const choiceKey = btn.getAttribute('data-choice');
				const stat = percentages.find(function (p) { return p.choice_key === choiceKey; });
				if (!stat) return;

				const isSelected = (choiceKey === selectedKey);

				btn.disabled = true;
				btn.classList.add('choice-stats-revealed');
				if (isSelected) {
					btn.classList.add('choice-stats-selected');
				} else {
					btn.classList.add('choice-stats-unselected');
				}

				// Create percentage bar overlay
				const bar = document.createElement('div');
				bar.className = 'choice-stats-bar';
				bar.style.width = '0%';
				btn.style.position = 'relative';
				btn.style.overflow = 'hidden';
				btn.appendChild(bar);

				// Create percentage label
				const label = document.createElement('span');
				label.className = 'choice-stats-percent';
				label.textContent = stat.percent + '%';
				btn.appendChild(label);

				// Animate bar width
				requestAnimationFrame(function () {
					requestAnimationFrame(function () {
						bar.style.width = stat.percent + '%';
					});
				});
			});

			setTimeout(resolve, DISPLAY_DURATION);
		});
	}

	function displayPreviewStats (stats, container) {
		var percentages = calculatePercentages(stats);
		var buttons = container.querySelectorAll('[data-choice]');

		container.classList.add('choice-stats-preview');

		buttons.forEach(function (btn) {
			var choiceKey = btn.getAttribute('data-choice');
			var stat = percentages.find(function (p) { return p.choice_key === choiceKey; });
			if (!stat) return;

			btn.style.position = 'relative';
			btn.style.overflow = 'hidden';

			var bar = document.createElement('div');
			bar.className = 'choice-stats-preview-bar';
			bar.style.width = '0%';
			btn.appendChild(bar);

			var label = document.createElement('span');
			label.className = 'choice-stats-preview-percent';
			label.textContent = stat.percent + '%';
			btn.appendChild(label);

			requestAnimationFrame(function () {
				requestAnimationFrame(function () {
					bar.style.width = stat.percent + '%';
				});
			});
		});
	}

	function cleanupPreview (container) {
		if (!container) return;
		container.classList.remove('choice-stats-preview');
		container.querySelectorAll('.choice-stats-preview-bar, .choice-stats-preview-percent').forEach(function (el) {
			el.remove();
		});
	}

	async function handlePreview (container) {
		var sceneId = getCurrentSceneId();
		if (!sceneId) return;

		isPreviewActive = true;

		await new Promise(function (resolve) { setTimeout(resolve, PREVIEW_DELAY); });
		if (!isPreviewActive) return;

		if (!container.querySelector('[data-choice]')) return;

		var stats = await getSceneStats(sceneId);
		if (!isPreviewActive) return;

		if (stats && stats.length > 0) {
			displayPreviewStats(stats, container);
		}
	}

	function installPreviewObserver () {
		if (observerInstalled) return;

		var target = document.querySelector('game-screen');
		if (!target) return;

		var observer = new MutationObserver(function (mutations) {
			for (var i = 0; i < mutations.length; i++) {
				var added = mutations[i].addedNodes;
				for (var j = 0; j < added.length; j++) {
					var node = added[j];
					if (node.nodeType !== 1) continue;

					var container = null;
					if (node.matches && node.matches('[data-component="choice-container"]')) {
						container = node;
					} else if (node.querySelector) {
						container = node.querySelector('[data-component="choice-container"]');
					}

					if (container && !container.querySelector('.choice-stats-preview-bar')) {
						handlePreview(container);
					}
				}
			}
		});

		observer.observe(target, { childList: true, subtree: true });
		observerInstalled = true;
	}

	function installHook () {
		var pendingChoice = null;

		function blockEvent (e) {
			var button = e.target.closest('[data-choice]:not([disabled])');
			if (!button) return;
			if (isReplayingClick) return;

			var sceneId = getCurrentSceneId();
			if (!sceneId) return;

			e.stopPropagation();
			e.stopImmediatePropagation();
			e.preventDefault();

			if (e.type === 'pointerdown') {
				pendingChoice = {
					button: button,
					choiceKey: button.getAttribute('data-choice'),
					container: button.closest('[data-component="choice-container"]'),
					sceneId: sceneId
				};
				handleChoice(pendingChoice);
			}
		}

		async function handleChoice (info) {
			isPreviewActive = false;
			cleanupPreview(info.container);

			var stats = await recordVoteAndGetStats(info.sceneId, info.choiceKey);

			if (stats && stats.length > 0 && info.container) {
				await displayStats(stats, info.choiceKey, info.container);
			}

			if (info.container) {
				info.container.classList.remove('choice-stats-active');
				info.container.querySelectorAll('.choice-stats-bar, .choice-stats-percent').forEach(function (el) {
					el.remove();
				});
				info.container.querySelectorAll('[data-choice]').forEach(function (btn) {
					btn.classList.remove('choice-stats-revealed', 'choice-stats-selected', 'choice-stats-unselected');
					btn.disabled = false;
				});
			}

			isReplayingClick = true;
			pendingChoice = null;
			info.button.click();

			setTimeout(function () { isReplayingClick = false; }, 100);
		}

		['pointerdown', 'mousedown', 'click'].forEach(function (evt) {
			document.addEventListener(evt, blockEvent, true);
		});
	}

	return { init: init, installHook: installHook, installPreviewObserver: installPreviewObserver };
})();
