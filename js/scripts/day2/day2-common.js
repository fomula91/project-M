/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 2 — 공통 (등교 인사, 과학실, 축제 준비, 저녁)
 *  파일: day2-common.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day2Start             : 등교
 *    - Day2SoraGreeting      : 소라 인사 분기
 *    - Day2SoraGreetingHigh  : 소라 인사 (호감 높음)
 *    - Day2SoraGreetingNormal: 소라 인사 (보통)
 *    - Day2HanaGreeting      : 하나 인사 분기
 *    - Day2HanaGreetingHigh  : 하나 인사 (호감 높음)
 *    - Day2HanaGreetingNormal: 하나 인사 (보통)
 *    - Day2ScienceLab        : 과학실 복선 (유우 노트)
 *    - Day2ScienceLabSora    : 소라에게 노트 질문
 *    - Day2ScienceLabHana    : 하나에게 노트 질문
 *    - Day2ScienceLabSkip    : 조용히 넘어감
 *    - Day2Morning           : 축제 준비 팀 선택
 *    - Day2Evening           : 석양 분기
 *    - Day2NeutralEvening    : 셋이서 하교
 *    - Day2End               : 버스 정류장, 유우 실루엣 → Day3Start
 *
 *  흐름:
 *    Day1Afternoon [cross-file] → Day2Start → Greeting → ScienceLab
 *    → Day2Morning → (Day2WithSora / Day2WithHana) [cross-file]
 *    → Day2Evening → Day2End → Day3Start [cross-file]
 *
 *  의존:
 *    - AffinityHint.show()  (affinity-hint.js)
 *    - storage: helped_sora, sora_affection, hana_affection, unknown_interest
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Day2Start — 등교
	// ──────────────────────────────────
	'Day2Start': [
		'play sound school-bell',
		'show scene school_front_early with fadeFromBlack duration 1500',
		'centered ── 2일차: 가까워지는 마음 ──',
		'show scene school_grounds_day with fadeIn',
		'사쿠라 학원에서의 둘째 날.',
		'어젯밤, 두 사람의 얼굴이 떠올라 잠을 설쳤다.',
		'show character p worried at center with fadeIn',
		'p ...왜 이렇게 두근거리는 걸까.',
		'어제 본 구교사 실루엣이 어른거린다.',
		'p ...소라 씨에게도, 하나에게도, 더 가까이 다가가고 싶어.',
		'알 수 없는 기대감이 발걸음을 재촉한다.',
		'hide character p with fadeOut',
		'교문을 들어서자 익숙한 목소리가 들려온다.',
		{
			'Conditional': {
				'Condition': function () {
					if (this.storage ('helped_sora') === true) {
						return 'SoraGreets';
					} else {
						return 'HanaGreets';
					}
				},
				'SoraGreets': 'jump Day2SoraGreeting',
				'HanaGreets': 'jump Day2HanaGreeting'
			}
		}
	],

	// ──────────────────────────────────
	//  Day2SoraGreeting — 소라 인사 분기
	// ──────────────────────────────────
	'Day2SoraGreeting': [
		{
			'Conditional': {
				'Condition': function () {
					if (this.storage ('sora_affection') >= 3) {
						return 'High';
					} else {
						return 'Normal';
					}
				},
				'High': 'jump Day2SoraGreetingHigh',
				'Normal': 'jump Day2SoraGreetingNormal'
			}
		}
	],

	// ──────────────────────────────────
	//  Day2SoraGreetingHigh — 소라 인사 (호감 높음)
	// ──────────────────────────────────
	'Day2SoraGreetingHigh': [
		'show character s happy at left with approachCloser',
		's {{player.name}} 씨, 좋은 아침이에요!',
		's 어제 도서관에서도 정말 즐거웠어요. 오늘도... 같이 있고 싶어요.',
		'소라가 평소보다 한 걸음 더 가까이 다가와 인사한다.',
		'show character h surprised at right with fadeIn',
		'h 앗! 소라가 웃고 있어?! 너희 둘 대체 어제 뭐 한 거야~?!',
		'jump Day2ScienceLab'
	],

	// ──────────────────────────────────
	//  Day2SoraGreetingNormal — 소라 인사 (보통)
	// ──────────────────────────────────
	'Day2SoraGreetingNormal': [
		'show character s happy at left with fadeIn',
		's {{player.name}} 씨, 좋은 아침이에요.',
		's 어제 도와주셔서 정말 감사했어요. 오늘도 잘 부탁드려요.',
		'소라가 평소보다 밝은 표정으로 인사한다.',
		'show character h surprised at right with fadeIn',
		'h 앗! 너희 둘 벌써 친해진 거야? 나도 끼워줘~!',
		'jump Day2ScienceLab'
	],

	// ──────────────────────────────────
	//  Day2HanaGreeting — 하나 인사 분기
	// ──────────────────────────────────
	'Day2HanaGreeting': [
		{
			'Conditional': {
				'Condition': function () {
					if (this.storage ('hana_affection') >= 3) {
						return 'High';
					} else {
						return 'Normal';
					}
				},
				'High': 'jump Day2HanaGreetingHigh',
				'Normal': 'jump Day2HanaGreetingNormal'
			}
		}
	],

	// ──────────────────────────────────
	//  Day2HanaGreetingHigh — 하나 인사 (호감 높음)
	// ──────────────────────────────────
	'Day2HanaGreetingHigh': [
		'show character h laugh at right with bounceIn',
		'h {{player.name}}~! 좋은 아침! 어제 옥상 진짜 좋았지?!',
		'h 오늘은 더 재밌는 데 가자! 나 이미 계획 다 세웠어~!',
		'하나가 신나서 달려와 팔짱을 낀다.',
		'show character s normal at left with fadeIn',
		's ...좋은 아침이에요. 하나 씨가 유독 밝네요, 오늘.',
		'jump Day2ScienceLab'
	],

	// ──────────────────────────────────
	//  Day2HanaGreetingNormal — 하나 인사 (보통)
	// ──────────────────────────────────
	'Day2HanaGreetingNormal': [
		'show character h happy at right with fadeIn',
		'h {{player.name}}~! 좋은 아침! 오늘도 재밌게 놀자!',
		'h 어제 매점 빵 맛있었지? 오늘은 다른 맛 먹어보자!',
		'하나가 달려와서 팔짱을 낀다.',
		'show character s normal at left with fadeIn',
		's ...좋은 아침이에요, {{player.name}} 씨.',
		'소라가 멀리서 조용히 인사한다.',
		'jump Day2ScienceLab'
	],

	// ──────────────────────────────────
	//  Day2ScienceLab — 과학실 복선 (유우 노트)
	// ──────────────────────────────────
	'Day2ScienceLab': [
		'show scene science_lab_01 with fadeIn',
		'1교시 과학 수업. 과학실에서 실험을 진행한다.',
		'show scene science_lab_03 with fadeIn',
		'실험 준비를 위해 서랍을 열었더니, 오래된 노트가 하나 들어있다.',
		'show character p surprised at center with fadeIn',
		'p ...이건 뭐지? "유우의 실험 노트"라고 적혀 있다.',
		'p 유우...? 어디서 들어본 것 같은데.',
		'노트 여백에 일기 같은 메모가 적혀 있다── "오늘 소라가 처음으로 웃었다."',
		'...여기저기 빼곡한 메모에서 주인의 정성이 느껴진다.',
		'show scene science_lab_05 with fadeIn',
		'정성스러운 필체가 눈에 밟힌다. 물어볼까, 그냥 넘어갈까.',
		'show character p normal at center with fadeIn',
		'p ...조금 신경 쓰이는데.',
		'show character p fadeOut',
		makeChoice('p 이 노트에 대해...', {
			AskSora: ['소라에게 물어본다', 'Day2ScienceLabSora'],
			AskHana: ['하나에게 물어본다', 'Day2ScienceLabHana'],
			Ignore: ['조용히 넘어간다', 'Day2ScienceLabSkip']
		})
	],

	// ──────────────────────────────────
	//  Day2ScienceLabSora — 소라에게 노트 질문
	// ──────────────────────────────────
	'Day2ScienceLabSora': [
		'show character s normal at center with fadeIn',
		's 그 노트... 어디서 찾으셨어요?',
		'show character s worried',
		's ...유우 선배의 거예요. 작년에 졸업한...',
		'소라가 순간 동요한 표정을 짓지만 이내 침착해진다.',
		'show character s normal',
		's 과학부에서 활동하셨던 분이에요. 뛰어난 분이었죠.',
		'p 소라 씨와도 아는 사이였어?',
		's ...네. 저와 하나를 이어준 분이기도 해요.',
		'소라가 작게 웃으며 말한다.',
		'hide character s with fadeOut',
		function () {
			this.storage({ unknown_interest: this.storage('unknown_interest') + 1 });
			AffinityHint.show('unknown');
		},
		'jump Day2Morning'
	],

	// ──────────────────────────────────
	//  Day2ScienceLabHana — 하나에게 노트 질문
	// ──────────────────────────────────
	'Day2ScienceLabHana': [
		'show character h normal2 at center with fadeIn',
		'h 앗, 그거! 유우 선배 노트다!',
		'h 작년에 졸업하신 분인데... 나랑 소라를 처음 이어준 사람이야.',
		'하나가 진지한 표정으로 노트를 바라본다.',
		'show character h happy',
		'h 과학 실험 엄청 잘하는 사람이었어! 나도 많이 배웠는데~',
		'p 그렇구나. 대단한 선배였나 보다.',
		'h 응! 언젠가 다시 올 수도 있다고 했었는데...',
		'hide character h with fadeOut',
		function () {
			this.storage({ unknown_interest: this.storage('unknown_interest') + 1 });
			AffinityHint.show('unknown');
		},
		'jump Day2Morning'
	],

	// ──────────────────────────────────
	//  Day2ScienceLabSkip — 조용히 넘어감
	// ──────────────────────────────────
	'Day2ScienceLabSkip': [
		'show character p normal at center with fadeIn',
		'p ...누군가의 물건이겠지. 조용히 넣어두자.',
		'노트를 서랍에 다시 넣고 수업에 집중한다.',
		'hide character p with fadeOut',
		'jump Day2Morning'
	],

	// ──────────────────────────────────
	//  Day2Morning — 축제 준비 팀 선택
	// ──────────────────────────────────
	'Day2Morning': [
		'play sound school-bell',
		'show scene classroom2_morning with slideLeft',
		'2교시가 끝나고, 담임 선생님이 공지를 한다.',
		'"내일 있을 학교 축제 준비를 시작하겠습니다. 2인 1조로 팀을 구성하세요."',
		'show character s worried at left with fadeIn',
		's {{player.name}} 씨... 혹시, 저와 같이 준비하실래요?',
		'소라가 조심스럽게 다가와 물어본다.',
		'show character h laugh at right with fadeIn',
		'h {{player.name}}! 나랑 같이 하자! 우리 팀이면 완전 재밌을 거야!',
		'하나가 신나서 뛰어온다.',
		'p ...소라의 조심스러움, 하나의 직진. 정반대인 두 사람.',
		'p 내일 축제를 누구와 함께하느냐에 따라 뭔가 달라질 것 같다.',
		'작은 선택이 큰 차이를 만들 예감이 든다.',
		'show character p normal at center with fadeIn',
		makeChoice('p ...누구와 팀을 할까?', {
			WithSora: ['소라와 함께한다', 'Day2WithSora'],
			WithHana: ['하나와 함께한다', 'Day2WithHana']
		})
	],

	// ──────────────────────────────────
	//  Day2Evening — 석양 분기
	// ──────────────────────────────────
	'Day2Evening': [
		'play sound school-bell',
		'show scene classroom_afternoon with fadeIn',
		'해가 지고, 교실에 주황빛이 가득 찬다.',
		'축제 준비를 마치고 돌아가려는데...',
		{
			'Conditional': {
				'Condition': function () {
					var sora = this.storage ('sora_affection');
					var hana = this.storage ('hana_affection');
					if (sora >= 4) {
						return 'SoraScene';
					} else if (hana >= 4) {
						return 'HanaScene';
					} else {
						return 'NeutralScene';
					}
				},
				'SoraScene': 'jump Day2SoraEvening',
				'HanaScene': 'jump Day2HanaEvening',
				'NeutralScene': 'jump Day2NeutralEvening'
			}
		}
	],

	// ──────────────────────────────────
	//  Day2NeutralEvening — 셋이서 하교
	// ──────────────────────────────────
	'Day2NeutralEvening': [
		'show scene school_grounds_evening with fadeIn',
		function () {
			this.storage ({
				sora_affection: this.storage ('sora_affection') + 1,
				hana_affection: this.storage ('hana_affection') + 1
			});
			AffinityHint.show ('both');
		},
		'교문을 나서려는데, 소라와 하나가 나란히 서 있다.',
		'show character s normal at left with fadeIn',
		's 아, {{player.name}} 씨. 같이 가실래요?',
		'show character h happy at right with fadeIn',
		'h 셋이서 가자! 오늘도 재밌었다~!',
		'play sound footsteps loop',
		'셋이서 나란히 걸으며 하교한다.',
		'show character p smile at center with fadeIn',
		'p ...이 순간이 계속되면 좋겠다.',
		'stop sound footsteps fade 1',
		// [CG] three-walk-home — 셋이서 나란히 하교
		'hide character p',
		'hide character s',
		'hide character h',
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'show scene three-walk-home_cg with fadeIn',
		'wait 3000',
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'gallery unlock three-walk-home',
		'show scene school_grounds_evening with fadeIn',
		'벚꽃 잎이 세 사람의 어깨 위로 내려앉는다.',
		'jump Day2End'
	],

	// ──────────────────────────────────
	//  Day2End — 버스 정류장, 유우 실루엣
	// ──────────────────────────────────
	'Day2End': [
		'show scene busstop_night with fadeIn',
		'버스 정류장에서 혼자 버스를 기다린다.',
		'show character p normal at center with fadeIn',
		'p ...내일은 축제다.',
		'p ...누구와 함께 보내게 될까.',
		'hide character p with fadeOut',
		'그때, 정류장 건너편에 낯선 인물이 서 있는 것이 보인다.',
		// [CG] busstop-silhouette — 가로등에 비치는 검정색 머리카락 실루엣
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'show scene busstop-silhouette_cg with fadeIn',
		'wait 3000',
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'gallery unlock busstop-silhouette',
		'show scene busstop_night with fadeIn',
		'show character u normal at left with fadeIn',
		'...검정색 머리카락이 가로등 불빛에 비친다.',
		'show character p surprised at center with fadeIn',
		'p ...저 사람은──',
		'고개를 돌려 다시 보니, 이미 아무도 없다.',
		'hide character u with fadeOut',
		'p ...기분 탓이었나.',
		'빈 책상의 낙서, 과학실 노트, 그리고 이 실루엣── 전부 이어져 있는 걸까.',
		'가로등이 한 번 깜빡이고, 정류장에 다시 정적이 내린다.',
		'p ...모르겠다. 하지만 무시할 수 없는 기분이야.',
		'hide character p with fadeOut',
		function () {
			this.storage({ unknown_interest: this.storage('unknown_interest') + 1 });
		},
		'설레는 마음을 안고, 서서히 잠이 든다.',
		'jump Day3Start'
	]
});
