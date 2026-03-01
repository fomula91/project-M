/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 5 — 소라 루트 (도서관 고백, 트루러브/온기 엔딩)
 *  파일: day5-sora.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day5SoraRoute   : 5일차 시작 → 도서관
 *    - Day5SoraLibrary : 소라 고백 이벤트
 *    - Day5SoraConfess2: 고백 선택
 *    - SoraTrueLoveEnd : 소라 트루 러브 엔딩 → end
 *    - SoraWarmEnd     : 소라 온기 엔딩 → end
 *
 *  흐름:
 *    Day4Evening [cross-file] → Day5SoraRoute → Day5SoraLibrary
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
		'p ...소라에게, 이번엔 제대로 전하고 싶어.',
		'주머니 속 종이학을 만진다. 소라가 건네줬던 작은 종이학.',
		'손끝에 전해지는 의외의 온기── 소라의 정성이 깃든 것 같다.',
		'p ...도서관에서 기다리고 있을 거야. 이번엔 내가 먼저.',
		'hide character p with fadeOut',
		'방과후──',
		'jump Day5SoraLibrary'
	],

	// ──────────────────────────────────
	//  Day5SoraLibrary — 소라 고백 이벤트
	// ──────────────────────────────────
	'Day5SoraLibrary': [
		'show scene classroom3_afternoon with fadeIn',
		'stop music',
		'play music sora-ending loop',
		'도서관. 석양 빛이 책장 사이로 스며들어 주황색으로 물들인다.',
		'오래된 책등이 호박색으로 빛난다. 창틈으로 마지막 벚꽃잎이 날아든다.',
		'시간이 멈춘 것 같은 고요한 공간.',
		'소라가 혼자 앉아 책을 읽고 있다.',
		'show character s normal at center with fadeIn',
		's 아, {{player.name}} 씨. 도서관까지 오시다니.',
		'show character p normal at right with fadeIn',
		'p 소라야, 이야기 좀 해도 될까?',
		's ...네, 물론이에요.',
		'p 유우 선배를 만나고... 소라에 대해 더 알게 됐어.',
		'p 혼자이던 시절의 이야기도, 마음을 여는 게 무서웠다는 것도.',
		'show character s worried',
		's {{player.name}} 씨, 저──',
		'p 그리고 그런 소라가... 나한테 더 소중해졌어.',
		'p 약한 모습도, 두려워하는 모습도 전부.',
		'show scene classroom3_afternoon with fadeIn',
		'show character s normal at center with fadeIn',
		'소라가 책을 내려놓고 천천히 일어선다.',
		's 전시회 때... 솔직히 더 말하고 싶은 게 있었어요.',
		's 하지만 용기가 나지 않아서... 그냥 웃고 말았어요.',
		's 그런데 어제... 유우 선배가 그랬어요.',
		's "네가 처음 마음을 연 상대야. 전하지 않으면 후회할 거야" 라고.',
		'show character s normal',
		's 그래서 이번에는... 제가 먼저 말할게요.',
		's {{player.name}} 씨, 저── 당신을 좋아해요.',
		's 친구가 아니라... 한 사람으로서.',
		// [CG] sora-confession — 호박빛 석양이 책장을 물들이는 도서관, 소라의 고백
		'hide character s',
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'show scene sora-confession_cg with fadeIn',
		'wait 3000',
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'gallery unlock sora-confession',
		'show scene classroom3_afternoon with fadeIn',
		'석양빛 도서관에서, 소라의 고백이 조용히 울려 퍼진다.',
		'jump Day5SoraConfess2'
	],

	// ──────────────────────────────────
	//  Day5SoraConfess2 — 고백 선택
	// ──────────────────────────────────
	'Day5SoraConfess2': [
		'show scene classroom3_afternoon with fadeIn',
		'소라의 고백이 아직 귓가에 맴돈다.',
		'이 말의 무게를── 소라가 얼마나 큰 용기를 냈는지── 알고 있다.',
		'"서두르지 마. 하지만 도망치지도 마."── 유우 선배의 말이 떠오른다.',
		'손끝이 떨린다. 하지만 이번만큼은 도망치지 않겠다.',
		'p ...대답해야 해. 소라의 용기에 걸맞은 대답을.',
		'wait 800',
		'show character s worried at center with fadeIn',
		'show character p normal at right with fadeIn',
		makeChoice('p 소라야...', {
			TrueLove: ['기다릴게. 소라의 속도에 맞춰서.', 'SoraTrueLoveEnd'],
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
		'p 기다릴게, 소라야. 소라의 속도에 맞춰서.',
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
		's 이 도서관에서, 이 석양 아래서... 약속해요.',
		'p 약속.',
		// [CG] sora-truelove — 석양 속 도서관에서 두 손 맞잡기
		'hide character p',
		'hide character s',
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'show scene sora-truelove_cg with fadeIn',
		'wait 3000',
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'gallery unlock sora-truelove',
		'석양이 도서관을 가득 물들이는 가운데, 두 사람은 조용히 손을 맞잡았다.',
		'show scene classroom3_evening with fadeIn',
		'centered ── 소라 트루 러브 엔딩: 도서관의 석양 ──',
		'stop music',
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
		'p 무리하지 않아도 괜찮아, 소라야.',
		'p 고백의 대답을 서둘러 할 필요 없어요.',
		'p 지금 이 순간, 소라와 함께 있는 것만으로도 충분해.',
		'show character s surprised',
		's {{player.name}} 씨...',
		'show character s happy',
		's 그런 말을 들으니까... 가슴이 따뜻해져요.',
		's 저도 아직 이 감정이 뭔지 확실하지는 않지만...',
		's {{player.name}} 씨 곁에 있으면 편안하다는 건 확실해요.',
		'p 그것만으로 충분해요.',
		'소라가 살며시 내 어깨에 머리를 기댄다.',
		// [CG] sora-warm — 소라가 어깨에 머리를 기대는 따뜻한 장면
		'hide character p',
		'hide character s',
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'show scene sora-warm_cg with fadeIn',
		'wait 3000',
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'gallery unlock sora-warm',
		'show scene classroom3_afternoon with fadeIn',
		's ...고마워요. 천천히... 알아가요.',
		'봄바람이 도서관 창문을 스친다.',
		'서두르지 않아도, 두 사람의 봄은 이미 시작되었다.',
		'centered ── 소라 엔딩: 천천히 피는 봄 ──',
		'stop music',
		'end'
	]
});
