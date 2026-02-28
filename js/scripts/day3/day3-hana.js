/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 3 — 하나 루트 (축제 데이트, 고백, 친구 엔딩)
 *  파일: day3-hana.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day3HanaRoute  : 하나와 축제 (hana +1)
 *    - Day3HanaClimax : 하교길 고백 이벤트
 *    - HanaConfess    : 하나 엔딩 (hana +2) → end
 *    - HanaFriendEnd  : 친구 엔딩 → Day4Start
 *
 *  흐름:
 *    Day3MainBranch [cross-file] → Day3HanaRoute → Day3HanaClimax
 *    → HanaConfess (end) / HanaFriendEnd → Day4Start [cross-file]
 *
 *  의존:
 *    - fadeScene(), fadeJump()  (helpers/transitions.js)
 *    - AffinityHint.show()     (affinity-hint.js)
 *    - storage: hana_affection, confessed, day3_ending_type
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Day3HanaRoute — 하나와 축제 (hana +1)
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
		'하나와 함께 축제를 돌아본다.',
		'h 와~! 이거 봐이거 봐! 솜사탕이다!',
		'h {{player.name}}! 같이 먹자!',
		'show character p smile at left with fadeIn',
		'p 하하, 그래!',
		'하나에 이끌려 이곳저곳을 돌아다닌다.',
		'h 여기도 가보자! 점술 카페래! 운세 봐주는 곳!',
		'하나가 신나서 뛰어간다.',
		'h "오늘 중요한 사람에게 마음을 전하세요" 래! 에헤~',
		'show character h surprised',
		'하나가 점술 결과를 보며 갑자기 말을 멈춘다.',
		'p 하나? 왜 그래?',
		'h ...아, 아무것도 아니야! 가자가자!',
		'show character h happy',
		'하나가 살짝 얼굴을 붉히며 서둘러 걸어간다.',
		'jump Day3HanaClimax'
	],

	// ──────────────────────────────────
	//  Day3HanaClimax — 하교길 고백 이벤트
	// ──────────────────────────────────
	'Day3HanaClimax': [
		...fadeScene('busstop_evening'),
		'stop music fade 2',
		'play music hana-ending loop fade 2',
		'show character h normal2',
		'축제가 끝나고, 하교 시간.',
		'h {{player.name}}... 잠깐만!',
		'하나가 교문 앞에서 나를 붙잡는다.',
		'h 저기... 좀 걸을래?',
		'p 응, 좋아.',
		'하나와 함께 벚꽃길을 걷는다. 하나가 평소와 달리 조용하다.',
		'h {{player.name}}... 나, 할 말이 있어.',
		'h 나 원래 항상 웃으면서 다니잖아. 밝은 게 좋으니까.',
		'h 근데... {{player.name}} 앞에서는 웃는 것만으로는 부족한 기분이 들어.',
		'show character h worried',
		'h 진짜 내 마음을 보여주고 싶달까...',
		'하나가 발을 멈추고 나를 똑바로 바라본다.',
		'h {{player.name}}, 나... 너 좋아해.',
		'h 친구로서가 아니라, 진짜로.',
		'항상 밝기만 하던 하나의 진지한 눈빛── 처음이다.',
		'이 용기를 가볍게 받아넘길 수 없다.',
		'p ...제대로 대답해야 해. 하나의 진심에.',
		'wait 800',
		{
			'Choice': {
				'Dialog': 'p 하나...',
				'Accept': {
					'Text': '나도 좋아해, 하나.',
					'Do': 'jump HanaConfess'
				},
				'Friends': {
					'Text': '하나는 소중한 친구야.',
					'Do': 'jump HanaFriendEnd'
				}
			}
		}
	],

	// ──────────────────────────────────
	//  HanaConfess — 하나 엔딩 (hana +2)
	// ──────────────────────────────────
	'HanaConfess': [
		function () {
			this.storage ({
				hana_affection: this.storage ('hana_affection') + 2,
				confessed: true
			});
			AffinityHint.show ('hana');
		},
		'show character p smile at left',
		'p 하나, 나도... 너 좋아해.',
		'show character h surprised',
		'h ...진짜?!',
		'하나의 눈이 크게 뜨인다. 그리고 눈물이 고인다.',
		'show character h laugh',
		'h 나, 나 지금 울면 안 되는데... 헤헤...',
		'h 너무 좋아서 눈물이 나는 건 처음이야.',
		'p 울어도 돼. 나 여기 있으니까.',
		'h {{player.name}}... 고마워. 정말 정말 고마워.',
		'show character h happy',
		'하나가 내 품에 안기며 웃음과 눈물을 동시에 보인다.',
		'벚꽃잎이 두 사람을 감싸며 춤추듯 흩날린다.',
		'h 나, {{player.name}} 옆에 평생 있을 거야. 약속!',
		'p 나도, 약속.',
		'벚꽃 비가 내리는 하교길, 하나와 손을 맞잡고 걸어간다.',
		'hide character p with fadeOut',
		'hide character h with fadeOut',
		'show scene school_grounds_evening with fadeIn',
		'centered ── 하나 엔딩: 벚꽃빛 하교길 ──',
		'end'
	],

	// ──────────────────────────────────
	//  HanaFriendEnd — 친구 엔딩 → Day4Start
	// ──────────────────────────────────
	'HanaFriendEnd': [
		'show character p normal at left',
		'show character h worried',
		'h ...그렇구나. 에헤, 역시 나 욕심이었나~',
		'하나가 눈물을 참으며 밝게 웃어 보인다.',
		'show character h happy',
		'h 괜찮아! 우리 절친이니까! 그걸로 충분해!',
		'p 하나... 고마워.',
		'h 울지마! 나 괜찮다고~! ...에헤.',
		'하나가 웃는 얼굴로 손을 흔들며 하교한다.',
		'show character p worried',
		'p ...미안, 하나.',
		'hide character p with fadeOut',
		'hide character h with fadeOut',
		'show scene school_grounds_evening with fadeIn',
		'centered ── 하나: 변하지 않는 밝은 미소 ──',
		'하지만... 이것으로 끝이 아닌 것 같다.',
		function () {
			this.storage({ day3_ending_type: 'hana_friend' });
		},
		...fadeJump('Day4Start'),
	]
});
