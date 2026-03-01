/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 3 — 소라 루트 (전시회, 감정 심화)
 *  파일: day3-sora.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day3SoraRoute  : 소라와 전시회 (sora +1)
 *    - Day3SoraClimax : 석양 감정 심화 → Day4Start
 *
 *  흐름:
 *    Day3MainBranch [cross-file] → Day3SoraRoute → Day3SoraClimax → Day4Start [cross-file]
 *
 *  의존:
 *    - fadeJump()            (helpers/transitions.js)
 *    - AffinityHint.show()  (affinity-hint.js)
 *    - storage: sora_affection, day3_ending_type
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Day3SoraRoute — 소라와 전시회 (sora +1)
	// ──────────────────────────────────
	'Day3SoraRoute': [
		'show scene classroom3_afternoon with slideLeft',
		function () {
			this.storage ({
				sora_affection: this.storage ('sora_affection') + 1
			});
			AffinityHint.show ('sora');
		},
		'show character s normal at center with fadeIn',
		'소라와 함께 전시회를 돌아본다.',
		's 이쪽에... 미술부 전시가 있어요.',
		'show character p smile at right with fadeIn',
		'p 같이 가보자.',
		'조용한 전시실 안, 벚꽃을 주제로 한 그림들이 걸려 있다.',
		'바깥의 소란이 멀게만 느껴진다. 그림 속 벚꽃이 진짜처럼 흩날리는 것 같다.',
		'이 공간만 따로 시간이 멈춘 것 같은 고요함.',
		's ...이 그림, 예쁘지 않아요?',
		'소라가 벚꽃 풍경화 앞에 멈춰 선다.',
		// [CG] sora-exhibition — 조용한 전시실, 벚꽃 그림 앞의 소라
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'show scene sora-exhibition_cg with fadeIn',
		'wait 3000',
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'gallery unlock sora-exhibition',
		'show scene classroom3_afternoon with fadeIn',
		'show character s normal at center with fadeIn',
		'show character p smile at right with fadeIn',
		'p 정말 예쁘네요. 근데 소라 씨가 더 예뻐요.',
		'show character s surprised',
		's ...?!',
		'소라의 얼굴이 새빨개진다.',
		's 그, 그런 말... 갑자기...',
		'p 하하, 솔직한 감상이에요.',
		's .........감사합니다.',
		'show character s happy',
		'소라가 고개를 숙이며 작게 웃는다.',
		'jump Day3SoraClimax'
	],

	// ──────────────────────────────────
	//  Day3SoraClimax — 석양 감정 심화 → Day4Start
	// ──────────────────────────────────
	'Day3SoraClimax': [
		'show scene school_grounds_evening with fadeIn',
		'stop music',
		'play music sora-ending loop',
		'show character s normal at center with fadeIn',
		'전시회가 끝나고, 석양이 학교를 물들인다.',
		'play sound footsteps loop',
		'소라와 함께 교정을 걷는다.',
		'stop sound footsteps',
		'소라가 벚꽃 나무 아래에서 발을 멈춘다.',
		'show character s worried',
		's 저는 원래... 사람과 가까워지는 게 무서웠어요.',
		's 혼자가 편하다고 생각했어요. 그게 저를 지키는 방법이라고...',
		'wait 600',
		's 그런데 {{player.name}} 씨를 만나고... 조금 달라진 것 같아요.',
		'show character s normal',
		's ...아직 잘 모르겠지만, 이런 기분은 처음이에요.',
		'소라의 눈에 석양빛이 반사된다.',
		'혼자이던 소라가 조금씩 마음을 열고 있다── 그 사실이 가슴을 따뜻하게 한다.',
		'show character p normal at right with fadeIn',
		'p ...소라 씨.',
		'p 저도 소라 씨랑 이야기하는 시간이 좋아요.',
		'show character s surprised',
		's ...!',
		'show character s happy',
		's ...감사합니다. 그 말, 기억할게요.',
		'벚꽃잎이 두 사람 사이로 흩날린다.',
		'아직 이름을 붙일 수 없는 감정. 하지만 확실히 무언가가 싹트고 있다.',
		'hide character p with fadeOut',
		'hide character s with fadeOut',
		'show scene auditorium_evening with fadeIn',
		'centered ── 소라: 이름 없는 온기 ──',
		'이불 속에서 오늘 하루를 되짚는다.',
		'소라의 조심스러운 고백── 아니, 아직 고백이라고 부르기엔 이른 말.',
		'하지만 왜 이렇게 두근거리는 걸까.',
		'p ...내일, 소라 씨에게 뭐라고 말해야 할까.',
		'stop music',
		function () {
			this.storage({ day3_ending_type: 'sora_deepen' });
		},
		...fadeJump('Day4Start'),
	]
});
