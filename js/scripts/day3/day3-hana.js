/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 3 — 하나 루트 (전시회, 감정 심화)
 *  파일: day3-hana.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day3HanaRoute  : 하나와 전시회 (hana +1)
 *    - Day3HanaClimax : 하교길 감정 심화 → Day4Start
 *
 *  흐름:
 *    Day3MainBranch [cross-file] → Day3HanaRoute → Day3HanaClimax → Day4Start [cross-file]
 *
 *  의존:
 *    - fadeScene(), fadeJump()  (helpers/transitions.js)
 *    - AffinityHint.show()     (affinity-hint.js)
 *    - storage: hana_affection, day3_ending_type
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Day3HanaRoute — 하나와 전시회 (hana +1)
	// ──────────────────────────────────
	'Day3HanaRoute': [
		'show scene auditorium_afternoon with slideRight',
		function () {
			this.storage ({
				hana_affection: this.storage ('hana_affection') + 1
			});
			AffinityHint.show ('hana');
		},
		'show character h laugh at center with fadeIn',
		'하나와 함께 전시회를 돌아본다.',
		'h 와~! 이거 봐이거 봐! 솜사탕이다!',
		'h {{player.name}}! 같이 먹자!',
		'show character p smile at left with fadeIn',
		'p 하하, 그래!',
		'하나에 이끌려 이곳저곳을 돌아다닌다.',
		'h 여기도 가보자! 심리 테스트 부스래!',
		'하나가 신나서 뛰어간다.',
		'h "가장 소중한 사람에게 하고 싶은 말을 적어보세요" 래! 에헤~',
		'show character h surprised',
		'하나가 질문지를 보며 갑자기 말을 멈춘다.',
		'p 하나? 왜 그래?',
		'h ...아, 아무것도 아니야! 가자가자!',
		'show character h happy',
		'하나가 살짝 얼굴을 붉히며 서둘러 걸어간다.',
		'jump Day3HanaClimax'
	],

	// ──────────────────────────────────
	//  Day3HanaClimax — 하교길 감정 심화 → Day4Start
	// ──────────────────────────────────
	'Day3HanaClimax': [
		...fadeScene('busstop_evening'),
		'stop music fade 2',
		'wait 2000',
		'play music hana-ending loop fade 2',
		'show character h normal2 at center with fadeIn',
		'전시회가 끝나고, 하교 시간.',
		'h {{player.name}}... 잠깐만!',
		'하나가 교문 앞에서 나를 붙잡는다.',
		'h 저기... 좀 걸을래?',
		'show character p normal at left with fadeIn',
		'p 응, 좋아.',
		'play sound footsteps loop',
		'하나와 함께 벚꽃길을 걷는다. 하나가 평소와 달리 조용하다.',
		'h {{player.name}}... 있잖아.',
		'h 나 원래 항상 웃으면서 다니잖아. 밝은 게 좋으니까.',
		'show character h worried',
		'h 근데... 가끔은 이렇게 조용히 걷는 것도 나쁘지 않다.',
		'stop sound footsteps',
		'하나가 발을 늦추며 하늘을 올려다본다.',
		'h {{player.name}} 앞에서는... 굳이 웃지 않아도 될 것 같은 기분이야.',
		'h 그게 뭔지는 아직 잘 모르겠는데...',
		'show character h normal2',
		'h ...나한테 중요한 사람이라는 건 확실해.',
		'항상 밝기만 하던 하나의 진지한 면── 처음이다.',
		'show character p normal at left',
		'p ...하나.',
		'p 나도 하나랑 있으면 편해. 진짜로.',
		'show character h surprised',
		'h ...진짜?',
		'show character h happy',
		'h 에헤... 그 말, 엄청 기쁘다.',
		'하나가 눈을 살짝 비비며 웃는다.',
		'play sound footsteps loop',
		'벚꽃잎이 두 사람의 어깨 위로 내려앉는다.',
		'stop sound footsteps fade 1',
		'hide character p with fadeOut',
		'hide character h with fadeOut',
		'show scene school_grounds_evening with fadeIn',
		'centered ── 하나: 웃음 너머의 진심 ──',
		'이불 속에서 오늘 하루를 되짚는다.',
		'항상 웃는 줄만 알았던 하나의 조용한 모습.',
		'...왠지 그 모습이 계속 떠오른다.',
		'p ...하나가 보여준 그 표정, 나만 본 건가.',
		'stop music',
		function () {
			this.storage({ day3_ending_type: 'hana_deepen' });
		},
		...fadeJump('Day4Start'),
	]
});
