/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 4 — 소라 오후 (유우 이야기 후 소라와 대화)
 *  파일: day4-sora.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day4SoraAfternoon : 소라와 과거 이야기 → Day4Evening
 *
 *  흐름:
 *    Day4Lunch [cross-file] → Day4SoraAfternoon → Day4Evening [cross-file]
 *
 *  의존:
 *    - storage: (없음)
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Day4SoraAfternoon — 소라와 과거 이야기
	// ──────────────────────────────────
	'Day4SoraAfternoon': [
		'show scene classroom3_afternoon with fadeIn',
		'오후, 소라를 찾아 교실로 간다.',
		'show character s normal at center with fadeIn',
		'소라의 표정은 평소와 같지만, 어딘가 조심스러운 거리감이 느껴진다.',
		'show character p normal at right with fadeIn',
		's ...어제 일은 괜찮아요. 신경 쓰지 마세요.',
		'p 소라 씨...',
		's 정말이에요. 저도... 정리할 시간이 필요했으니까요.',
		'show character s normal',
		's 그보다──',
		's 오늘 유우 선배가 왔다면서요?',
		'p 응. 만났어.',
		's ...네.',
		'show character s worried',
		'소라가 고개를 숙인다.',
		's 유우 선배를 보니까... 그때 생각이 났어요.',
		's 혼자서 도서관에만 있던 시절. 아무도 말을 걸어주지 않던 날들.',
		's 유우 선배가 처음으로... "같이 밥 먹을래?" 하고 물어봤어요.',
		'소라의 눈가가 촉촉해진다.',
		'소라의 손이 무의식적으로 책상 모서리를 잡는다. 잠깐의 정적.',
		'wait 600',
		// [CG] sora-past-tears — 눈가가 촉촉해지는 소라, 과거의 외로움
		'hide character s',
		'hide character p',
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'show scene sora-past-tears_cg with fadeIn',
		'wait 3000',
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'gallery unlock sora-past-tears',
		'show scene classroom3_afternoon with fadeIn',
		'show character s worried at center with fadeIn',
		'show character p normal at right with fadeIn',
		's 그때부터... 사람과 함께하는 게 두렵지만은 않게 됐어요.',
		's 그리고 {{player.name}} 씨를 만나서...',
		'show character s surprised',
		's 아, 죄송해요. 갑자기 이런 이야기를──',
		'p 아니, 들려줘서 고마워요.',
		'p 소라 씨의 이야기를 더 듣고 싶어.',
		'show character s happy',
		's ...감사해요, {{player.name}} 씨.',
		'소라가 눈물을 닦으며 작게 웃는다.',
		'hide character s with fadeOut',
		'hide character p with fadeOut',
		'jump Day4Evening'
	]
});
