/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 5 — 하나 루트 (수영장 재고백, 트루러브/온기 엔딩)
 *  파일: day5-hana.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day5HanaRoute   : 5일차 시작 → 수영장
 *    - Day5HanaPool    : 하나 재고백 이벤트
 *    - Day5HanaConfess2: 재고백 선택
 *    - HanaTrueLoveEnd : 하나 트루 러브 엔딩 → end
 *    - HanaWarmEnd     : 하나 온기 엔딩 → end
 *
 *  흐름:
 *    Day4Evening [cross-file] → Day5HanaRoute → Day5HanaPool
 *    → Day5HanaConfess2 → HanaTrueLoveEnd (end) / HanaWarmEnd (end)
 *
 *  의존:
 *    - AffinityHint.show()  (affinity-hint.js)
 *    - storage: hana_affection
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Day5HanaRoute — 5일차 시작
	// ──────────────────────────────────
	'Day5HanaRoute': [
		'show scene school_front_early with fadeFromBlack duration 1500',
		'centered ── 5일차: 다시 전하는 마음 ──',
		'show scene school_grounds_day with fadeIn',
		'유우 선배의 말이 머릿속에서 맴돈다.',
		'"서두르지 마. 하지만 도망치지도 마."',
		'show character p normal at center with fadeIn',
		'p ...하나에게, 이번엔 진심을 전하고 싶어.',
		'hide character p with fadeOut',
		'방과후──',
		'jump Day5HanaPool'
	],

	// ──────────────────────────────────
	//  Day5HanaPool — 하나 재고백 이벤트
	// ──────────────────────────────────
	'Day5HanaPool': [
		'show scene swimming_pool with fadeIn',
		'stop music fade 2',
		'play music hana-ending loop fade 2',
		'수영장 뒤편. 유우가 알려준 비밀 장소.',
		'하나가 울타리에 앉아 하늘을 바라보고 있다.',
		'show character h normal2 at center with fadeIn',
		'h ...아, {{player.name}}. 여기 어떻게 알았어?',
		'show character p normal at right with fadeIn',
		'p 유우 선배가 알려줬어. 여기가 하나의 비밀 장소라고.',
		'h 에~ 선배 입이 가벼워! ...뭐, 상관없지만.',
		'하나가 씩 웃지만, 금방 진지한 표정으로 돌아온다.',
		'show character h worried',
		'h {{player.name}}... 나, 사실 그때 얘기가 있어.',
		'h 축제 때 고백했을 때... 솔직히 거절당할 줄 알았어.',
		'h 근데 막상 들으니까... 역시 아프더라.',
		'p 하나...',
		'h 아, 근데 괜찮아! 나 원래 금방 일어나는 타입이거든!',
		'show character h happy',
		'h 그리고... 유우 선배가 그랬어.',
		'h "진짜 좋아하면 한 번으로 안 끝나" 라고.',
		'show character h normal2',
		'h 그래서── 나, 아직 포기 안 했어.',
		'h {{player.name}}, 나는 아직도 너를 좋아해.',
		'수영장 수면에 비친 석양이 하나의 얼굴을 비춘다.',
		'hide character h',
		'hide character p',
		'jump Day5HanaConfess2'
	],

	// ──────────────────────────────────
	//  Day5HanaConfess2 — 재고백 선택
	// ──────────────────────────────────
	'Day5HanaConfess2': [
		'show scene swimming_pool with fadeIn',
		'show character h normal2 at center with fadeIn',
		'show character p normal at right with fadeIn',
		{
			'Choice': {
				'Dialog': 'p 하나...',
				'TrueLove': {
					'Text': '하나의 웃음도, 눈물도, 전부 좋아해.',
					'Do': 'jump HanaTrueLoveEnd'
				},
				'Warm': {
					'Text': '천천히 가자, 우리.',
					'Do': 'jump HanaWarmEnd'
				}
			}
		}
	],

	// ──────────────────────────────────
	//  HanaTrueLoveEnd — 하나 트루 러브 엔딩
	// ──────────────────────────────────
	'HanaTrueLoveEnd': [
		function () {
			this.storage({ hana_affection: this.storage('hana_affection') + 3 });
			AffinityHint.show('hana');
		},
		'p 하나의 웃음도, 눈물도, 밝은 모습도 어두운 모습도──',
		'p 전부 좋아해.',
		'show character h surprised',
		'h ...{{player.name}}?',
		'p 가면 벗은 하나도, 가면 쓴 하나도, 전부 하나니까.',
		'p 나는 전부 받아들일게.',
		'show character h laugh',
		'하나의 눈에 눈물이 고인다. 하지만 이번엔 활짝 웃고 있다.',
		'h 바보... 그런 말 하면 나 또 울잖아.',
		'h 나, 나도──! {{player.name}}의 전부가 좋아!',
		'show character h yandere',
		'h 그러니까... 다른 여자한테 한눈팔면 안 돼...?',
		'p ...!',
		'show character h laugh',
		'h 농담이야! ...반은.',
		'h 에헤헤~',
		'하나가 눈물을 닦으며 장난스럽게 웃는다.',
		'p 하하, 알겠어. 약속.',
		'h 약속! 어기면 안 돼!',
		'석양빛 수영장에서, 두 사람의 웃음이 퍼져나간다.',
		'이것은 가면이 아닌, 진짜 하나의 웃음.',
		'hide character p with fadeOut',
		'hide character h with fadeOut',
		'show scene swimming_pool with fadeIn',
		'centered ── 하나 트루 러브 엔딩: 수영장의 석양 ──',
		'end'
	],

	// ──────────────────────────────────
	//  HanaWarmEnd — 하나 온기 엔딩
	// ──────────────────────────────────
	'HanaWarmEnd': [
		function () {
			this.storage({ hana_affection: this.storage('hana_affection') + 2 });
			AffinityHint.show('hana');
		},
		'p 천천히 가자, 하나.',
		'p 지금 당장 대답하지 않아도 돼.',
		'p 대신... 앞으로도 곁에 있을게.',
		'show character h surprised',
		'h ...에? 거절이 아니야?',
		'p 거절이 아니야. 서두르지 않겠다는 거야.',
		'p 유우 선배가 알려줬어. 중요한 건 함께 있는 거라고.',
		'show character h shy',
		'h {{player.name}}...',
		'하나가 수줍게 고개를 숙인다. 처음 보는 표정이다.',
		'h 그렇다면... 조금만 더 기다려줘.',
		'h 다음에는 내가 더 용기 내서... 제대로 전할게.',
		'p 기다릴게, 하나.',
		'show character h happy',
		'h 에헤~ 약속이다!',
		'수영장의 수면이 석양빛에 반짝인다.',
		'아직 봄은 시작일 뿐. 두 사람의 계절은 이제부터.',
		'hide character p with fadeOut',
		'hide character h with fadeOut',
		'show scene swimming_pool with fadeIn',
		'centered ── 하나 엔딩: 새로운 계절의 시작 ──',
		'end'
	]
});
