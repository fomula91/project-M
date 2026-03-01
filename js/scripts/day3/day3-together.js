/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 3 — Together 루트 (셋이서 전시회, 유대 확인)
 *  파일: day3-together.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day3TogetherRoute  : 셋이서 전시회
 *    - Day3TogetherClimax : 옥상 석양, 셋의 유대 확인 → Day4Start
 *
 *  흐름:
 *    Day3BothHigh / Day3Balanced [cross-file] → Day3TogetherRoute
 *    → Day3TogetherClimax → Day4Start [cross-file]
 *
 *  의존:
 *    - fadeJump()  (helpers/transitions.js)
 *    - storage: chose_both, day3_ending_type
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Day3TogetherRoute — 셋이서 전시회
	// ──────────────────────────────────
	'Day3TogetherRoute': [
		'show scene auditorium_noon with slideRight',
		function () {
			this.storage ({
				chose_both: true
			});
		},
		'show character s normal at left with fadeIn',
		'show character h laugh at right with fadeIn',
		'셋이서 전시회를 돌아본다.',
		'h 솜사탕 사자! 셋이서 나눠 먹자!',
		'show character s surprised',
		's 에... 저는 달콤한 건 좀...',
		'h 에이~ 맛있으니까 먹어봐!',
		'show character s fadeOut',
		'show character h fadeOut',
		'소라와 하나가 티격태격하는 모습에 나도 모르게 웃음이 난다.',
		'show character p smile at center with fadeIn',
		'p 하하, 너희 둘 정말 사이좋다.',
		'show character s normal at left with fadeIn',
		's 에...? 그, 그런가요?',
		'show character h happy at right with fadeIn',
		'h 어? 우리 사이 좋았어? 에헤~',
		'셋이서 체험 부스, 전시실, 매점을 돌아다닌다.',
		'정신없이 즐거운 시간이 흘러간다.',
		'jump Day3TogetherClimax'
	],

	// ──────────────────────────────────
	//  Day3TogetherClimax — 옥상 석양, 셋의 유대 확인 → Day4Start
	// ──────────────────────────────────
	'Day3TogetherClimax': [
		'show scene auditorium_evening with fadeIn',
		'stop music',
		'play music harem-ending loop fade 2',
		'show character s happy at left with fadeIn',
		'show character h happy at right with fadeIn',
		'show character p smile at center with fadeIn',
		'전시회가 끝나갈 무렵, 옥상에서 셋이 석양을 바라본다.',
		's ...오늘 정말 즐거웠어요.',
		'h 응! 최고의 하루였어!',
		'p 나도... 너희 덕분에 정말 행복했어.',
		'show character h normal2',
		'h ...있잖아, {{player.name}}.',
		'h 나, 오늘 셋이서 다녀서 좋았어. 근데...',
		'show character h worried',
		'h ...가끔 이 시간이 언제까지 갈 수 있을까 생각하면 좀 무서워.',
		'show character s worried',
		's ...저도요. 이렇게 좋은 날이 계속될 수 있을까...',
		'show character p normal',
		'p ...나도 같은 생각이야.',
		'p 하지만 적어도 오늘── 이 순간은 진짜잖아.',
		'show character s happy at left',
		's ...맞아요. 지금 이 순간은 진짜예요.',
		'show character h happy at right',
		'h 응! 그거면 충분해! ...아마!',
		'세 사람 모두 웃는다. 하지만 어딘가 아련한 웃음.',
		'벚꽃잎이 세 사람의 어깨 위로 내려앉는다.',
		'hide character p with fadeOut',
		'hide character s',
		'hide character h',
		'show scene school_grounds_evening with fadeIn',
		'centered ── 셋: 벚꽃 아래의 약속 ──',
		'이불 속에서 오늘 하루를 되짚는다.',
		'소라의 조용한 불안, 하나의 솔직한 두려움.',
		'셋이서 함께라는 건 편안하면서도, 어딘가 위태롭다.',
		'p ...이 관계가 어디로 향하는 걸까.',
		'stop music',
		function () {
			this.storage({ day3_ending_type: 'together_deepen' });
		},
		...fadeJump('Day4Start'),
	]
});
