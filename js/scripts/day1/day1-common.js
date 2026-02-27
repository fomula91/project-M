/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 1 — 공통 (프롤로그, 등교, 오전·점심 이벤트, 오후)
 *  파일: day1-common.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Start               : 이름 입력
 *    - Prologue            : 프롤로그 / 오프닝 CG
 *    - SchoolArrival       : 교실 도착, 소라·하나 첫 만남
 *    - Day1UnknownHint     : 빈 책상 복선 (분기)
 *    - Day1UnknownHintSora : 빈 책상 — 소라 대사
 *    - Day1UnknownHintHana : 빈 책상 — 하나 대사
 *    - MorningEvent        : 쉬는 시간 첫 선택지
 *    - LunchTime           : 점심시간 분기
 *    - LunchTimeSoraWarm   : 점심 — 소라 호감 높음
 *    - LunchTimeHanaWarm   : 점심 — 하나 호감 높음
 *    - LunchTimeChoice     : 점심 장소 선택
 *    - Day1Afternoon       : 하교, 구교사 복선 → Day2Start
 *
 *  흐름:
 *    Start → Prologue → SchoolArrival → Day1UnknownHint
 *    → MorningEvent → (HelpSora / GoWithHana) [cross-file]
 *    → LunchTime → LunchTimeChoice → (Library / Rooftop) [cross-file]
 *    → Day1Afternoon → Day2Start [cross-file]
 *
 *  의존:
 *    - fadeJump()            (helpers/transitions.js)
 *    - storage: player, helped_sora, sora_affection, hana_affection
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Start — 이름 입력
	// ──────────────────────────────────
	'Start': [
		'play music sunny-day loop',
		'show scene auditorium_sunrise with fadeIn',
		'centered 사쿠라 학원에 오신 것을 환영합니다.',
		{
			'Input': {
				'Text': '이름을 입력해주세요:',
				'Validation': function (input) {
					return input.trim ().length > 0;
				},
				'Save': function (input) {
					this.storage ({
						player: {
							name: input
						}
					});
					return true;
				},
				'Revert': function () {
					this.storage ({
						player: {
							name: ''
						}
					});
				},
				'Warning': '이름을 입력해야 합니다!'
			}
		},
		'jump Prologue'
	],

	// ──────────────────────────────────
	//  Prologue — 프롤로그 / 오프닝 CG
	// ──────────────────────────────────
	'Prologue': [
		'show scene school_front_day with fadeIn',
		'centered ── 1일차: 벚꽃이 피는 아침 ──',
		'봄바람이 벚꽃 잎을 흩날리는 4월의 아침.',
		'오늘은 사쿠라 학원의 새 학기 첫날이다.',
		'show character p normal at center with fadeIn',
		'p 후아... 드디어 새 학기다. 어떤 만남이 기다리고 있을까.',
		'hide character p with fadeOut',
		'교문을 지나 교실로 향하는 길, 벚꽃 나무 아래에서 한 소녀가 서 있다.',
		{'Function': {
			'Apply': function () {
				monogatari.distractionFree();
			},
			'Revert': function () {
				monogatari.distractionFree();
			}
		}},
		'show scene opening_cg with fadeIn',
		'wait 5000',
		'show scene school_front_day with fadeIn',
		{'Function': {
			'Apply': function () {
				monogatari.distractionFree();
			},
			'Revert': function () {
				monogatari.distractionFree();
			}
		}},
		'gallery unlock opening-unknown',
		...fadeJump('SchoolArrival'),
	],

	// ──────────────────────────────────
	//  SchoolArrival — 교실 도착, 소라·하나 첫 만남
	// ──────────────────────────────────
	'SchoolArrival': [
		'show scene classroom_day with fadeFromBlack duration 1500',
		'교실에 들어서자, 두 사람이 눈에 들어온다.',
		'show character s normal at left with slideInLeft',
		's 안녕하세요. 저는 이 반의 학급위원 소라입니다.',
		's 새로 오신 분이군요. 잘 부탁드립니다.',
		'조용하지만 단정한 인상의 소녀가 차분하게 인사한다.',
		'show character h happy at right with slideInRight',
		'wait 400',
		'h 앗! 새로운 친구다! 안녕안녕~! 나는 하나!',
		'h 우리 같은 반이네! 앞으로 잘 지내자~!',
		'밝은 미소로 다가오는 활발한 소녀.',
		'show character p smile at center with fadeInUp',
		'p ...두 사람 다 인상적이네. 잘 지낼 수 있겠지?',
		'hide character p with fadeOut',
		'wait 200',
		'hide character s with fadeOutLeft',
		'hide character h with fadeOutRight',
		'wait 400',
		...fadeJump('Day1UnknownHint'),
	],

	// ──────────────────────────────────
	//  Day1UnknownHint — 빈 책상 복선 (분기)
	// ──────────────────────────────────
	'Day1UnknownHint': [
		'show scene classroom_day with fadeFromBlack duration 1500',
		'자리를 찾아 앉으려는데, 창가 맨 뒷줄에 빈 책상이 눈에 들어온다.',
		'책상 위에 오래된 낙서가 희미하게 남아있다.',
		'show character p surprised at center with fadeIn',
		'p ...여기는 아무도 안 앉나?',
		{
			'Conditional': {
				'Condition': function () {
					return this.storage('helped_sora') ? 'SoraSays' : 'HanaSays';
				},
				'SoraSays': 'jump Day1UnknownHintSora',
				'HanaSays': 'jump Day1UnknownHintHana'
			}
		}
	],

	// ──────────────────────────────────
	//  Day1UnknownHintSora — 빈 책상 (소라 대사)
	// ──────────────────────────────────
	'Day1UnknownHintSora': [
		'show character s normal at left with fadeIn',
		's 아, 그 자리요... 작년에 졸업한 선배가 앉던 자리예요.',
		's 꽤 유명한 분이었는데... 소라와 하나, 둘 다 잘 알던 사이래요.',
		'show character p normal',
		'p 그렇구나... 어떤 사람이었을까.',
		's ...좋은 사람이었다고 들었어요.',
		'소라가 잠깐 창밖을 바라보며 말한다.',
		'hide character s with fadeOut',
		'hide character p with fadeOut',
		...fadeJump('MorningEvent'),
	],

	// ──────────────────────────────────
	//  Day1UnknownHintHana — 빈 책상 (하나 대사)
	// ──────────────────────────────────
	'Day1UnknownHintHana': [
		'show character h normal2 at right with fadeIn',
		'h 아, 거기? 작년에 졸업한 선배 자리야.',
		'h 나랑 소라 사이를 이어준 사람이기도 해.',
		'show character p normal',
		'p 오, 어떤 사람이었어?',
		'h 음~... 특이한 사람? 밝은 것 같으면서도 어딘가 신비로운...',
		'하나가 살짝 그리운 표정을 짓는다.',
		'hide character h with fadeOut',
		'hide character p with fadeOut',
		...fadeJump('MorningEvent'),
	],

	// ──────────────────────────────────
	//  MorningEvent — 쉬는 시간 첫 선택지
	// ──────────────────────────────────
	'MorningEvent': [
		'show scene classroom2_morning with fadeFromBlack duration 1500',
		'쉬는 시간, 복도에서 소란이 들린다.',
		'show character s worried at left with slideInLeft',
		'wait 300',
		'show character s worried at center with fadeIn',
		's 저기... 죄송한데, 이 서류들을 교무실까지 옮겨야 하는데...',
		'소라가 잔뜩 쌓인 서류를 들고 힘겨워하고 있다.',
		'show character s worried at left with fadeIn',
		'show character h happy at right with bounceIn',
		'h {{player.name}}~! 나랑 같이 학교 탐험하러 가자! 매점에 새로 나온 빵이 있대!',
		'하나가 신나서 손을 잡아끈다.',
		'show character p worried at center with fadeInUp',
		{
			'Choice': {
				'Dialog': 'p ...어떻게 하지?',
				'Help': {
					'Text': '소라를 도와준다',
					'Do': 'jump HelpSora'
				},
				'Go': {
					'Text': '하나를 따라간다',
					'Do': 'jump GoWithHana'
				}
			}
		}
	],

	// ──────────────────────────────────
	//  LunchTime — 점심시간 분기
	// ──────────────────────────────────
	'LunchTime': [
		'show scene classroom_day with fadeIn',
		'점심시간이 되었다.',
		'오늘은 어디서 점심을 먹을까 고민하는데...',
		{
			'Conditional': {
				'Condition': function () {
					if (this.storage ('helped_sora') === true) {
						return 'SoraWarm';
					} else {
						return 'HanaWarm';
					}
				},
				'SoraWarm': 'jump LunchTimeSoraWarm',
				'HanaWarm': 'jump LunchTimeHanaWarm'
			}
		}
	],

	// ──────────────────────────────────
	//  LunchTimeSoraWarm — 점심 (소라 호감 높음)
	// ──────────────────────────────────
	'LunchTimeSoraWarm': [
		'show character s happy at left with fadeIn',
		's {{player.name}} 씨! 아까 도와주신 덕분에 서류 정리가 빨리 끝났어요.',
		's 혹시 시간 되시면... 도서관에서 같이 점심 드실래요?',
		's 조용하고 좋은 자리가 있어요. 감사 인사도 제대로 드리고 싶어서...',
		'show character h happy at right with fadeIn',
		'h {{player.name}}~! 옥상에서 같이 밥 먹자! 바람도 시원하고 좋아!',
		'jump LunchTimeChoice'
	],

	// ──────────────────────────────────
	//  LunchTimeHanaWarm — 점심 (하나 호감 높음)
	// ──────────────────────────────────
	'LunchTimeHanaWarm': [
		'show character s normal at left with fadeIn',
		's {{player.name}} 씨, 혹시 시간 되시면... 도서관에서 같이 점심 드실래요?',
		's 조용하고 좋은 자리가 있어요.',
		'show character h laugh at right with fadeIn',
		'h {{player.name}}~! 아까 매점 탐험 재밌었지? 옥상에서 같이 밥 먹자!',
		'h 바람도 시원하고, 아까 산 빵도 같이 먹자~!',
		'jump LunchTimeChoice'
	],

	// ──────────────────────────────────
	//  LunchTimeChoice — 점심 장소 선택
	// ──────────────────────────────────
	'LunchTimeChoice': [
		'show character p normal at center with fadeIn',
		{
			'Choice': {
				'Dialog': 'p ...어디로 갈까?',
				'Library': {
					'Text': '도서관에서 소라와 함께',
					'Do': 'jump Library'
				},
				'Rooftop': {
					'Text': '옥상에서 하나와 함께',
					'Do': 'jump Rooftop'
				}
			}
		}
	],

	// ──────────────────────────────────
	//  Day1Afternoon — 하교, 구교사 복선
	// ──────────────────────────────────
	'Day1Afternoon': [
		'show scene classroom_afternoon with fadeIn',
		'오후 수업이 끝나고, 석양이 교실을 물들인다.',
		'show character p normal at center with fadeIn',
		'p ...오늘 하루가 정말 빠르게 지나갔다.',
		'show character p smile',
		'p ...새 학교에서의 첫날, 좋은 사람들을 만났어.',
		'hide character p with fadeOut',
		'집으로 돌아가는 길──',
		'show scene another_building_day with fadeIn',
		'교문 옆 구교사 건물이 눈에 들어온다.',
		'show character p surprised at center with fadeIn',
		'p ...어? 저 건물 유리창에 누가──',
		'유리창 너머로 누군가의 실루엣이 보인 것 같았다.',
		'p ...기분 탓인가.',
		'고개를 갸웃하며 다시 걷기 시작한다.',
		'hide character p with fadeOut',
		'show scene school_grounds_evening with fadeIn',
		'벚꽃 나무 아래서 오늘 하루를 떠올린다.',
		'show character p normal at center with fadeIn',
		'p 내일은 또 어떤 일이 있을까...',
		'hide character p with fadeOut',
		'눈을 감으면 소라의 차분한 미소와 하나의 밝은 웃음이 떠오른다.',
		...fadeJump('Day2Start', { duration: 800 }),
	]
});
