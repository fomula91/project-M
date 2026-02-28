/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 4 — Together 오후 (셋이서 유우 재회)
 *  파일: day4-together.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day4TogetherAfternoon : 셋이서 유우 만남 → Day4Evening
 *
 *  흐름:
 *    Day4Lunch [cross-file] → Day4TogetherAfternoon → Day4Evening [cross-file]
 *
 *  의존:
 *    - storage: (없음)
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Day4TogetherAfternoon — 셋이서 유우 만남
	// ──────────────────────────────────
	'Day4TogetherAfternoon': [
		'show scene auditorium_noon with fadeIn',
		'오후, 소라, 하나와 함께 유우를 만나러 간다.',
		'show character s normal at left with fadeIn',
		'show character h happy at right with fadeIn',
		'show character u normal at center with fadeIn',
		'u 와... 셋이서 오다니. 변했네, 소라.',
		'show character s surprised at left',
		's 유우 선배...! 오랜만이에요.',
		'show character h laugh at right',
		'h 선배~! 보고 싶었어! 왜 연락도 안 하고!',
		'u 하하, 미안. 대학 생활이 바빠서.',
		'유우가 세 사람을 번갈아 바라본다.',
		'u ...좋은 친구를 사귀었구나, 둘 다.',
		'show character p normal at center with fadeIn',
		'hide character u with fadeOut',
		'p 유우 선배, 이 둘 덕분에 매일이 즐거워요.',
		'u 그 말 들으니까 안심이다.',
		'show character p fadeOut',
		'show character u normal at center with fadeIn',
		'u 소라도, 하나도... 예전에는 각자 힘들었거든.',
		'u 근데 지금은 서로가 있으니까. 그리고 네가 있으니까.',
		'show character s happy at left',
		's ...네, 정말 그래요.',
		'show character h happy at right',
		'h 맞아! 셋이서라면 뭐든 할 수 있어!',
		'유우가 만족스럽게 고개를 끄덕인다.',
		'hide character s with fadeOut',
		'hide character h with fadeOut',
		'hide character u with fadeOut',
		'jump Day4Evening'
	]
});
