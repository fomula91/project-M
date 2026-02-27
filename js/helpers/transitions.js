/**
 * Fade-to-black 후 jump하는 전환 시퀀스 생성
 * @param {string} label - jump 대상 라벨
 * @param {object} opts - { color, duration }
 * @returns {Array} Monogatari script 엔트리 배열
 */
function fadeJump(label, opts = {}) {
	const { color = '#000000', duration = 200 } = opts;
	return [
		'show scene ' + color + ' with fadeToBlack duration 1500',
		'wait ' + duration,
		'jump ' + label
	];
}

/**
 * Fade-to-black 후 새 scene으로 전환 (jump 없이, 같은 라벨 내에서 배경 교체)
 * @param {string} sceneId - 등록된 scene 에셋 이름
 * @param {object} opts - { color, duration, transition }
 * @returns {Array} Monogatari script 엔트리 배열
 */
function fadeScene(sceneId, opts = {}) {
	const { color = '#000000', duration = 200, transition = 'fadeFromBlack duration 1500' } = opts;
	return [
		'show scene ' + color + ' with fadeToBlack duration 1500',
		'wait ' + duration,
		'show scene ' + sceneId + ' with ' + transition
	];
}
