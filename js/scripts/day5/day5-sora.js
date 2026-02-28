/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 5 — 소라 루트 (과학실 재고백, 트루러브/온기 엔딩)
 *  파일: day5-sora.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day5SoraRoute   : 5일차 시작 → 과학실
 *    - Day5SoraScience : 소라 재고백 이벤트
 *    - Day5SoraConfess2: 재고백 선택
 *    - SoraTrueLoveEnd : 소라 트루 러브 엔딩 → end
 *    - SoraWarmEnd     : 소라 온기 엔딩 → end
 *
 *  흐름:
 *    Day4Evening [cross-file] → Day5SoraRoute → Day5SoraScience
 *    → Day5SoraConfess2 → SoraTrueLoveEnd (end) / SoraWarmEnd (end)
 *
 *  의존:
 *    - AffinityHint.show()  (affinity-hint.js)
 *    - storage: sora_affection
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Day5SoraRoute — 5일차 시작
	// ──────────────────────────────────
	'Day5SoraRoute': [
		'play sound school-bell',
		'show scene school_front_early with fadeFromBlack duration 1500',
		'centered ── 5일차: 다시 전하는 마음 ──',
		'show scene school_grounds_day with fadeIn',
		'유우 선배의 말이 머릿속에서 맴돈다.',
		'"서두르지 마. 하지만 도망치지도 마."',
		'show character p normal at center with fadeIn',
		'p ...소라 씨에게, 이번엔 제대로 전하고 싶어.',
		'주머니 속 종이학을 만진다. 소라가 건네줬던 행운의 부적.',
		'손끝에 전해지는 의외의 온기── 소라의 정성이 깃든 것 같다.',
		'p ...과학실에서 기다리고 있을 거야. 이번엔 내가 먼저.',
		'hide character p with fadeOut',
		'방과후──',
		'jump Day5SoraScience'
	],

	// ──────────────────────────────────
	//  Day5SoraScience — 소라 재고백 이벤트
	// ──────────────────────────────────
	'Day5SoraScience': [
		'show scene science_lab_06 with fadeIn',
		'stop music fade 2',
		'wait 2000',
		'play music sora-ending loop fade 2',
		'과학실. 석양 빛이 실험 기구들을 주황색으로 물들인다.',
		'비커와 시험관이 호박색으로 빛난다. 창틈으로 마지막 벚꽃잎이 날아든다.',
		'시간이 멈춘 것 같은 고요한 공간.',
		'소라가 혼자 앉아 책을 읽고 있다.',
		'show character s normal at center with fadeIn',
		's 아, {{player.name}} 씨. 과학실까지 오시다니.',
		'show character p normal at right with fadeIn',
		'p 소라 씨, 이야기 좀 해도 될까요?',
		's ...네, 물론이에요.',
		'show scene science_lab_07 with fadeIn',
		'p 유우 선배를 만나고... 소라 씨에 대해 더 알게 됐어요.',
		'p 혼자이던 시절의 이야기도, 마음을 여는 게 무서웠다는 것도.',
		'show character s worried',
		's {{player.name}} 씨, 저──',
		'p 그리고 그런 소라 씨가... 저는 더 소중해졌어요.',
		'p 약한 모습도, 두려워하는 모습도 전부.',
		'show scene science_lab_08 with fadeIn',
		'소라가 책을 내려놓고 천천히 일어선다.',
		's 전에... {{player.name}} 씨가 좋은 친구로 지내자고 했을 때요.',
		's 솔직히... 마음이 많이 아팠어요.',
		's 하지만 그게 제 탓이라고 생각했어요. 마음을 제대로 전하지 못한.',
		'show character s normal',
		's 그래서 이번에는... 제가 먼저 말할게요.',
		's {{player.name}} 씨, 저── 당신을 좋아해요.',
		's 친구가 아니라... 한 사람으로서.',
		'석양빛 과학실에서, 소라의 고백이 조용히 울려 퍼진다.',
		'hide character s',
		'hide character p',
		'jump Day5SoraConfess2'
	],

	// ──────────────────────────────────
	//  Day5SoraConfess2 — 재고백 선택
	// ──────────────────────────────────
	'Day5SoraConfess2': [
		'show scene science_lab_08 with fadeIn',
		'소라의 고백이 아직 귓가에 맴돈다.',
		'이 말의 무게를── 소라가 얼마나 큰 용기를 냈는지── 알고 있다.',
		'"서두르지 마. 하지만 도망치지도 마."── 유우 선배의 말이 떠오른다.',
		'손끝이 떨린다. 하지만 이번만큼은 도망치지 않겠다.',
		'p ...대답해야 해. 소라 씨의 용기에 걸맞은 대답을.',
		'wait 800',
		'show character s worried at center with fadeIn',
		'show character p normal at right with fadeIn',
		makeChoice('p 소라 씨...', {
			TrueLove: ['기다릴게요. 소라 씨의 속도에 맞춰서.', 'SoraTrueLoveEnd'],
			Warm: ['무리하지 않아도 괜찮아요.', 'SoraWarmEnd']
		})
	],

	// ──────────────────────────────────
	//  SoraTrueLoveEnd — 소라 트루 러브 엔딩
	// ──────────────────────────────────
	'SoraTrueLoveEnd': [
		function () {
			this.storage({ sora_affection: this.storage('sora_affection') + 3 });
			AffinityHint.show('sora');
		},
		'p 기다릴게요, 소라 씨. 소라 씨의 속도에 맞춰서.',
		'p 서두르지 않을게요. 하지만 절대 떠나지도 않을게요.',
		'show character s surprised',
		's ...!',
		'소라의 눈에서 눈물이 한 줄기 흘러내린다.',
		's 그 말... 유우 선배가 했던 말이랑 닮았어요.',
		's "서두르지 마. 하지만 도망치지도 마."',
		's {{player.name}} 씨는... 정말로 저를 이해해주는 거죠?',
		'p 이해하고 싶어요. 앞으로도 계속.',
		'show character s happy',
		'소라가 두 손으로 내 손을 잡는다.',
		's 저도요. {{player.name}} 씨와 함께... 천천히 걸어가고 싶어요.',
		's 이 과학실에서, 이 석양 아래서... 약속해요.',
		'p 약속.',
		'석양이 과학실을 가득 물들이는 가운데, 두 사람은 조용히 손을 맞잡았다.',
		'hide character p with fadeOut',
		'hide character s with fadeOut',
		'show scene science_lab_08 with fadeIn',
		'centered ── 소라 트루 러브 엔딩: 과학실의 석양 ──',
		'end'
	],

	// ──────────────────────────────────
	//  SoraWarmEnd — 소라 온기 엔딩
	// ──────────────────────────────────
	'SoraWarmEnd': [
		function () {
			this.storage({ sora_affection: this.storage('sora_affection') + 2 });
			AffinityHint.show('sora');
		},
		'p 무리하지 않아도 괜찮아요, 소라 씨.',
		'p 고백의 대답을 서둘러 할 필요 없어요.',
		'p 지금 이 순간, 소라 씨와 함께 있는 것만으로도 충분해요.',
		'show character s surprised',
		's {{player.name}} 씨...',
		'show character s happy',
		's 그런 말을 들으니까... 가슴이 따뜻해져요.',
		's 저도 아직 이 감정이 뭔지 확실하지는 않지만...',
		's {{player.name}} 씨 곁에 있으면 편안하다는 건 확실해요.',
		'p 그것만으로 충분해요.',
		'소라가 살며시 내 어깨에 머리를 기댄다.',
		's ...고마워요. 천천히... 알아가요.',
		'봄바람이 과학실 창문을 스친다.',
		'서두르지 않아도, 두 사람의 봄은 이미 시작되었다.',
		'hide character p with fadeOut',
		'hide character s with fadeOut',
		'show scene science_lab_06 with fadeIn',
		'centered ── 소라 엔딩: 천천히 피는 봄 ──',
		'end'
	]
});
