/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 4 — 공통 (유우 등장, 과학실, 수영장, 저녁 분기)
 *  파일: day4-common.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day4Start            : 등교, 유우 첫 만남
 *    - Day4MeetUnknownHigh  : 유우 만남 (관심 높음)
 *    - Day4MeetUnknownNormal: 유우 만남 (보통)
 *    - Day4Morning          : 과학실에서 유우와 대화
 *    - Day4AskAboutSora     : 소라에 대해 질문
 *    - Day4AskAboutHana     : 하나에 대해 질문
 *    - Day4AskAboutAll      : 셋 관계 질문
 *    - Day4Lunch            : 수영장 비밀 장소 → 오후 분기
 *    - Day4Evening          : 유우 조언 + 최종 선택 → Day5
 *
 *  흐름:
 *    Day3 Friend/Friendship [cross-file] → Day4Start → Day4Morning
 *    → Day4Lunch → (Day4SoraAfternoon / Day4HanaAfternoon / Day4TogetherAfternoon) [cross-file]
 *    → Day4Evening → (Day5SoraRoute / Day5HanaRoute / Day5TogetherRoute) [cross-file]
 *
 *  의존:
 *    - fadeScene()          (helpers/transitions.js)
 *    - AffinityHint.show()  (affinity-hint.js)
 *    - storage: unknown_interest, met_unknown, sora_affection, hana_affection, day3_ending_type
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Day4Start — 등교, 유우 첫 만남
	// ──────────────────────────────────
	'Day4Start': [
		'stop music fade 2',
		'wait 2000',
		'play music acoustic-chill loop fade 2',
		'play sound school-bell',
		'show scene school_front_day with fadeFromBlack duration 1500',
		'centered ── 4일차: 지나간 봄의 기억 ──',
		'show scene school_grounds_day with fadeIn',
		'축제가 끝나고 월요일 아침.',
		'어딘가 허전한 기분으로 교문을 지나는데──',
		'show character p normal at center with fadeIn',
		'p ...축제 끝나니까 갑자기 조용하네.',
		'hide character p with fadeOut',
		'교문 앞에서 낯선 인물이 서 있다.',
		'show character u normal at center with fadeIn',
		{
			'Conditional': {
				'Condition': function () {
					return this.storage('unknown_interest') >= 2 ? 'HighInterest' : 'NormalMeet';
				},
				'HighInterest': 'jump Day4MeetUnknownHigh',
				'NormalMeet': 'jump Day4MeetUnknownNormal'
			}
		}
	],

	// ──────────────────────────────────
	//  Day4MeetUnknownHigh — 유우 만남 (관심 높음)
	// ──────────────────────────────────
	'Day4MeetUnknownHigh': [
		'show character p surprised at right with fadeIn',
		'p ...어제 정류장에서 본──?!',
		'u 후후, 눈치가 빠르구나.',
		'u 안녕. 나는 유우. 작년에 이 학교를 졸업했어.',
		function () {
			this.storage({ met_unknown: true });
			monogatari.characters()['u'].name = '유우';
		},
		'p 유우... 선배? 소라와 하나가 이야기하던──',
		'u 맞아. 그 아이들의 선배이자, 오래된 친구.',
		'u 축제에 한번 들르려고 했는데 하루 늦었네.',
		'show character u normal',
		'유우가 밝게 웃으며 말한다.',
		'hide character p with fadeOut',
		'hide character u with fadeOut',
		'jump Day4Morning'
	],

	// ──────────────────────────────────
	//  Day4MeetUnknownNormal — 유우 만남 (보통)
	// ──────────────────────────────────
	'Day4MeetUnknownNormal': [
		'show character p surprised at right with fadeIn',
		'p ...저기, 혹시 이 학교 학생이세요?',
		'u 아, 아니. 작년에 졸업했어. 나는 유우.',
		function () {
			this.storage({ met_unknown: true });
			monogatari.characters()['u'].name = '유우';
		},
		'u 잠깐 학교에 볼일이 있어서 왔어.',
		'u 넌... 소라와 하나의 새 친구구나?',
		'p 네? 저를 아세요?',
		'u 후후, 소문이 빠르거든.',
		'유우가 의미심장하게 웃는다.',
		'hide character p with fadeOut',
		'hide character u with fadeOut',
		'jump Day4Morning'
	],

	// ──────────────────────────────────
	//  Day4Morning — 과학실에서 유우와 대화
	// ──────────────────────────────────
	'Day4Morning': [
		'show scene classroom_day with fadeIn',
		'1교시가 끝나고, 유우와 함께 과학실로 향한다.',
		'show scene science_lab_02 with fadeIn',
		'show character u normal at left with fadeIn',
		'u 여기... 변한 게 없네. 내가 실험하던 자리도 그대로고.',
		'show character p normal at right with fadeIn',
		'p 유우 선배, 소라와 하나에 대해... 좀 더 알려주실 수 있나요?',
		'show scene science_lab_04 with fadeIn',
		'u 그래, 궁금하겠지.',
		'p ...유우 선배라면 분명 많은 걸 알고 있을 거다.',
		'가장 듣고 싶은 이야기가 뭔지, 스스로에게 물어본다.',
		makeChoice('p 유우 선배에게...', {
			AboutSora: ['소라에게 특별한 존재였나요?', 'Day4AskAboutSora'],
			AboutHana: ['하나에게 특별한 존재였나요?', 'Day4AskAboutHana'],
			AboutAll: ['셋이서 어떤 사이였어요?', 'Day4AskAboutAll']
		})
	],

	// ──────────────────────────────────
	//  Day4AskAboutSora — 소라에 대해 질문
	// ──────────────────────────────────
	'Day4AskAboutSora': [
		'u 소라는... 예전에는 아무에게도 마음을 열지 않는 아이였어.',
		'u 혼자가 편하다고, 그게 안전하다고 생각했지.',
		'u 내가 처음으로 그 벽에 균열을 낸 거야. 그리고 하나가 그 틈을 넓혔고.',
		function () {
			this.storage({ sora_affection: this.storage('sora_affection') + 1 });
			AffinityHint.show('sora');
		},
		'u 그런데 지금은... 너라는 사람이 그 벽을 완전히 허물고 있는 것 같더라.',
		'p ...저요?',
		'u 후후. 표정을 보면 알 수 있어.',
		'hide character u with fadeOut',
		'hide character p with fadeOut',
		'jump Day4Lunch'
	],

	// ──────────────────────────────────
	//  Day4AskAboutHana — 하나에 대해 질문
	// ──────────────────────────────────
	'Day4AskAboutHana': [
		'u 하나는 항상 밝게 웃잖아? 근데 그게 전부가 아니야.',
		'u 중학교 때 왕따를 당한 적이 있어. 그래서... 밝은 척하는 거야.',
		'u 웃으면 아무도 자기를 미워하지 않을 거라고 생각하거든.',
		function () {
			this.storage({ hana_affection: this.storage('hana_affection') + 1 });
			AffinityHint.show('hana');
		},
		'u 하지만 너 앞에서는... 진짜 웃고 있더라.',
		'p ...하나가 그런 과거를...',
		'u 소중히 대해줘. 그 아이의 진짜 웃음을.',
		'hide character u with fadeOut',
		'hide character p with fadeOut',
		'jump Day4Lunch'
	],

	// ──────────────────────────────────
	//  Day4AskAboutAll — 셋 관계 질문
	// ──────────────────────────────────
	'Day4AskAboutAll': [
		'u 우리 셋은... 특별했어. 서로 다른 결핍을 가진 세 사람이었지.',
		'u 소라는 외로움, 하나는 불안, 나는... 음, 방향 상실?',
		'u 그래도 셋이 모이면 왜인지 괜찮았어. 서로의 빈자리를 채워주니까.',
		function () {
			this.storage({ sora_affection: this.storage('sora_affection') + 1 });
			this.storage({ hana_affection: this.storage('hana_affection') + 1 });
		},
		'u 그리고 지금... 그 자리에 네가 있는 거야.',
		'p 저는 그런 대단한 사람이──',
		'u 대단할 필요 없어. 그냥 곁에 있어주는 것만으로도 충분해.',
		'hide character u with fadeOut',
		'hide character p with fadeOut',
		'jump Day4Lunch'
	],

	// ──────────────────────────────────
	//  Day4Lunch — 수영장 비밀 장소
	// ──────────────────────────────────
	'Day4Lunch': [
		'show scene swimming_pool with fadeIn',
		'유우가 데려간 곳은 학교 수영장 뒤편의 작은 공간.',
		'show character u normal at center with fadeIn',
		'u 여기는 내 비밀 장소였어. 아무도 안 오거든.',
		'show character p normal at right with fadeIn',
		'p 조용하고 좋네요.',
		'u 소라와 하나도 여기서 많이 이야기했어.',
		'u 소라가 처음으로 울었던 곳이기도 하고...',
		'u 하나가 처음으로 진짜 속마음을 보여준 곳이기도 하고.',
		'p ...두 사람 모두, 겉으로는 안 보이는 아픔이 있었군요.',
		'u 누구나 그렇지. 너도 마찬가지일 거야.',
		'유우가 하늘을 올려다보며 말한다.',
		'수면 위로 잔물결이 퍼진다. 햇살이 물결 위에서 부서진다.',
		'wait 800',
		'u 중요한 건... 그 아픔을 나눌 수 있는 사람이 곁에 있느냐야.',
		'hide character u with fadeOut',
		'hide character p with fadeOut',
		{
			'Conditional': {
				'Condition': function () {
					var type = this.storage('day3_ending_type');
					if (type === 'sora_friend') return 'SoraAfternoon';
					if (type === 'hana_friend') return 'HanaAfternoon';
					return 'TogetherAfternoon';
				},
				'SoraAfternoon': 'jump Day4SoraAfternoon',
				'HanaAfternoon': 'jump Day4HanaAfternoon',
				'TogetherAfternoon': 'jump Day4TogetherAfternoon'
			}
		}
	],

	// ──────────────────────────────────
	//  Day4Evening — 유우 조언 + 최종 선택
	// ──────────────────────────────────
	'Day4Evening': [
		...fadeScene('busstop_evening'),
		'play sound footsteps loop',
		'하교 시간. 유우가 버스 정류장까지 함께 걸어준다.',
		'show character u normal at left with fadeIn',
		'u 오늘 하루... 어땠어?',
		'show character p normal at right with fadeIn',
		'p 많은 걸 알게 됐어요. 소라와 하나에 대해서도, 저 자신에 대해서도.',
		'u 그래. 그걸로 충분해.',
		'u 나는 내일 돌아가야 해. 대학 수업도 있고.',
		'유우가 먼 곳을 바라보며 말한다.',
		'u 마지막으로 하나만 말해줄게.',
		'u ...서두르지 마. 하지만 도망치지도 마.',
		'u 네 마음이 향하는 곳으로, 솔직하게.',
		'p 유우 선배...',
		'u 파이팅, 후배.',
		'stop sound footsteps fade 1',
		'유우가 손을 흔들며 떠난다.',
		'hide character u with fadeOut',
		'show character p normal',
		'p ......',
		'p ...내 마음이 향하는 곳.',
		'며칠간의 기억이 빠르게 스쳐 지나간다.',
		'소라의 조용한 미소, 하나의 밝은 웃음, 빈 책상의 낙서, 종이학의 온기.',
		'그리고 유우 선배의 말── "도망치지도 마."',
		'p ...알겠어. 이번엔 솔직하게.',
		'wait 800',
		'hide character p with fadeOut',
		makeChoice('p 나는──', {
			ToSora: ['소라에게 다시 한번...', 'Day5SoraRoute'],
			ToHana: ['하나에게 다시 한번...', 'Day5HanaRoute'],
			ToBoth: ['두 사람 모두 소중해.', 'Day5TogetherRoute']
		})
	]
});
