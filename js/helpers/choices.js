/**
 * Monogatari Choice 객체 생성 헬퍼
 * @param {string} dialog - 선택지 이전 대사 (예: 'p ...누구에게 물어볼까?')
 * @param {Object} options - { ChoiceKey: ['선택지 텍스트', 'JumpLabel'], ... }
 * @returns {Object} Monogatari Choice 액션 객체
 */
function makeChoice(dialog, options) {
	var choice = { 'Choice': {} };
	if (dialog) choice['Choice']['Dialog'] = dialog;
	for (var key in options) {
		choice['Choice'][key] = { 'Text': options[key][0], 'Do': 'jump ' + options[key][1] };
	}
	return choice;
}
