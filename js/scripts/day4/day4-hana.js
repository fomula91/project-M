/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 4 — 하나 오후 (유우 이야기 후 하나와 대화)
 *  파일: day4-hana.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day4HanaAfternoon : 하나와 솔직한 대화 → Day4Evening
 *
 *  흐름:
 *    Day4Lunch [cross-file] → Day4HanaAfternoon → Day4Evening [cross-file]
 *
 *  의존:
 *    - storage: (없음)
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Day4HanaAfternoon — 하나와 솔직한 대화
	// ──────────────────────────────────
	'Day4HanaAfternoon': [
		'show scene auditorium_afternoon with fadeIn',
		'오후, 하나를 찾아 강당 뒤편으로 간다.',
		'show character h normal2 at center with fadeIn',
		'하나가 혼자 앉아 하늘을 바라보고 있다.',
		'show character p normal at right with fadeIn',
		'p 하나, 여기 있었어?',
		'h ...아, {{player.name}}.',
		'하나가 웃지만, 평소의 에너지가 없다.',
		'h ...어제는 좀 부끄러운 거 보여줬다~ 에헤.',
		'p 하나...',
		'h 괜찮아, 진짜로! ...아직 좀 아프긴 하지만. 그건 내 몫이니까.',
		'잠깐의 침묵.',
		'하나가 숨을 고르고 말을 잇는다.',
		'h 유우 선배가 왔더라.',
		'p 응, 나도 만났어.',
		'h 그래...?',
		'show character h worried',
		'h 선배를 보니까... 좀 생각이 많아졌어.',
		'h 나, 원래... 밝은 척하는 거 잘하잖아.',
		'h 웃으면 다들 나를 좋아해줄 거라고 생각했거든.',
		'h 근데 유우 선배가 그랬어. "가면 벗어도 괜찮아" 라고.',
		'show character h normal2',
		'h {{player.name}} 앞에서는... 나도 좀 솔직해지고 싶어.',
		'h 항상 밝기만 한 건 아니야. 가끔은 힘들기도 하고.',
		'하나가 말을 멈춘다. 바람 소리만이 두 사람 사이를 채운다.',
		'wait 600',
		// [CG] hana-unmasked — 혼자 앉아 하늘을 바라보는 하나, 가면 뒤 진짜 표정
		'hide character h',
		'hide character p',
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'show scene hana-unmasked_cg with fadeIn',
		'wait 3000',
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'gallery unlock hana-unmasked',
		'show scene auditorium_afternoon with fadeIn',
		'show character h worried at center with fadeIn',
		'show character p normal at right with fadeIn',
		'p 알아, 하나. 억지로 웃지 않아도 돼.',
		'p 울고 싶으면 울어도 돼. 내가 여기 있잖아.',
		'show character h surprised',
		'h ...{{player.name}}.',
		'show character h happy',
		'h 고마워. 진짜로.',
		'하나가 처음으로 꾸밈없는 미소를 짓는다.',
		'hide character h with fadeOut',
		'hide character p with fadeOut',
		'jump Day4Evening'
	]
});
