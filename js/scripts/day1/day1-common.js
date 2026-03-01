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
		'p ...전학 첫날.',
		'p 전 학교에선 딱히 깊은 관계도, 그렇다고 혼자인 것도 아닌── 어중간한 거리감.',
		'p 누구와도 가까워지지 못한 건 아닌데, 돌이켜보면 남는 게 없다.',
		'p 이번엔 너무 멀어지지도, 괜히 조급해지지도 말자.',
		'p 그냥... 후회 없는 한 학기였으면 좋겠다.',
		'hide character p with fadeOut',
		'교문을 지나 교실로 향하는 길──',
		'벚꽃 나무 아래에 누군가 서 있다.',
		'흩날리는 꽃잎에 가려 얼굴이 잘 보이지 않는다.',
		'...왜인지, 발이 멈춘다.',
		'하늘을 가득 메운 벚꽃잎이 분홍빛 눈처럼 흩날린다.',
		'잠깐 올려다본다. ...아름답다.',
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
		'show character p normal at center with fadeIn',
		'p ...누구였을까.',
		'p 얼굴은 제대로 못 봤는데, 왜인지 기억에 남는다.',
		'hide character p with fadeOut',
		'시계를 보니 예종이 가까워지고 있다. 서둘러야 한다.',
		...fadeJump('SchoolArrival'),
	],

	// ──────────────────────────────────
	//  SchoolArrival — 교실 도착, 소라·하나 첫 만남
	// ──────────────────────────────────
	'SchoolArrival': [
		'play sound school-bell',
		'show scene classroom_day with fadeFromBlack duration 1500',
		'아침 햇살이 창문을 통해 쏟아져 들어온다. 분필 가루와 새 교과서 냄새.',
		'새 학기 특유의 설렘이 교실 안에 가득하다.',
		'교실 안에는 이미 친한 무리끼리 자리를 잡고 떠들고 있다.',
		'1학년을 함께 보낸 아이들 사이에 이미 만들어진 관계가 느껴진다.',
		'"자, 오늘 2학년으로 전학 온 학생이야. 잘 지내 보렴."',
		'담임 선생님이 나를 반 앞에 세운다.',
		'show character p normal at center with fadeIn',
		'p (2학년 중간에 전학이라... 아무래도 좀 눈에 띄겠지.)',
		'hide character p with fadeOut',
		'"소라, 오늘 하루만 전학생 안내 좀 도와줄 수 있겠니?"',
		'show character s normal at left with slideInLeft',
		's ...네, 알겠습니다.',
		'조용하지만 단정한 인상의 소녀가 자리에서 일어선다.',
		's 안녕하세요. 소라입니다. 오늘... 제가 안내를 맡게 됐어요.',
		'조심스러운 말투. 부탁받은 역할이 조금 부담스러운 듯한 표정.',
		'show character h happy at right with slideInRight',
		'wait 400',
		'h 앗! 새로운 친구다! 안녕안녕~! 나는 하나!',
		'h 우리 같은 반이네! 앞으로 잘 지내자~!',
		'밝은 미소로 다가오는 활발한 소녀. 주변의 시선 따위 아랑곳하지 않는다.',
		'show character p smile at center with fadeInUp',
		'p ...분위기가 확실히 다른 두 사람이네.',
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
		'자리를 찾아 앉으려는데, 창틀에 작게 새겨진 글씨가 눈에 들어온다.',
		'오래된 듯 희미하게 파묻힌 글씨.',
		'"봄은 금방 지나간다"── 누군가 정성스레 새긴 듯한 필체.',
		'왠지 마음에 걸리는 문장이다.',
		'show character p normal at center with fadeIn',
		'p ...누가 새긴 걸까. 신경 쓰이긴 하지만.',
		'쉬는 시간이 되자 슬쩍 옆 자리를 둘러본다.',
		makeChoice('p ...누가 알고 있을까?', {
			AskSora: ['소라에게 물어본다', 'Day1UnknownHintSora'],
			AskHana: ['하나에게 물어본다', 'Day1UnknownHintHana']
		})
	],

	// ──────────────────────────────────
	//  Day1UnknownHintSora — 빈 책상 (소라 대사)
	// ──────────────────────────────────
	'Day1UnknownHintSora': [
		'show character s normal at left with fadeIn',
		's 아, 그 낙서요... 작년에 졸업한 선배가 새긴 거예요.',
		's 저와 하나 둘 다 잘 알던 분이었어요.',
		'show character p normal',
		'p 그렇구나... 어떤 사람이었어?',
		's ...좋은 분이었어요. 가끔 생각나요.',
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
		'h 아, 그거? 작년에 졸업한 선배가 새긴 거야.',
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
		'play sound school-bell',
		'show scene classroom2_morning with fadeFromBlack duration 1500',
		'쉬는 시간, 복도에서 소란이 들린다.',
		'show character s worried at left with slideInLeft',
		'소라가 잔뜩 쌓인 서류를 들고 복도를 지나간다. 누군가에게 도움을 청하려다 멈추는 모습.',
		's .............',
		'show character h happy at right with bounceIn',
		'h {{player.name}}~! 나랑 같이 학교 탐험하러 가자! 매점에 새로 나온 빵이 있대!',
		'하나가 신나서 손을 잡아끈다.',
		'p ...첫날부터 이런 상황이라니.',
		'소라의 곤란한 표정도, 하나의 밝은 웃음도 신경 쓰인다.',
		'이미 어떤 기로에 서 있는 것 같은 기분.',
		'show character p worried at center with fadeInUp',
		makeChoice('p ...어떻게 하지?', {
			Help: ['소라를 도와준다', 'HelpSora'],
			Go: ['하나를 따라간다', 'GoWithHana']
		})
	],

	// ──────────────────────────────────
	//  LunchTime — 점심시간 분기
	// ──────────────────────────────────
	'LunchTime': [
		'play sound school-bell',
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
		's 혹시 조용한 데서 쉬고 싶으시면... 도서관 옆에 좋은 자리가 있어요.',
		's 감사 인사도 제대로 드리고 싶어서...',
		'show character h happy at right with fadeIn',
		'h {{player.name}}~! 옥상에서 같이 밥 먹자! 바람도 시원하고 좋아!',
		'jump LunchTimeChoice'
	],

	// ──────────────────────────────────
	//  LunchTimeHanaWarm — 점심 (하나 호감 높음)
	// ──────────────────────────────────
	'LunchTimeHanaWarm': [
		'show character s normal at left with fadeIn',
		's {{player.name}} 씨, 혹시 조용한 데서 쉬고 싶으시면... 도서관 옆에 좋은 자리가 있어요.',
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
		'p 휴게 라운지의 따뜻한 고요함... 옥상의 시원한 바람...',
		'p 어느 쪽이든 가보고 싶은 마음이 드는 건 마찬가지다.',
		'잠시 고민한다.',
		makeChoice('p ...어디로 갈까?', {
			Library: ['휴게 라운지에서 소라와 함께', 'Library'],
			Rooftop: ['옥상에서 하나와 함께', 'Rooftop']
		})
	],

	// ──────────────────────────────────
	//  Day1Afternoon — 하교, 구교사 복선
	// ──────────────────────────────────
	'Day1Afternoon': [
		'play sound school-bell',
		'show scene classroom_afternoon with fadeIn',
		'오후 수업이 끝나고, 석양이 교실을 물들인다.',
		'show character p normal at center with fadeIn',
		'p ...오늘 하루가 정말 빠르게 지나갔다.',
		'show character p smile',
		'p ...새 학교에서의 첫날, 좋은 사람들을 만났어.',
		'hide character p with fadeOut',
		'집으로 돌아가는 길──',
		'play sound footsteps',
		'show scene another_building_day with fadeIn',
		'stop sound footsteps',
		'교문 옆 구교사 건물이 눈에 들어온다.',
		'show character p surprised at center with fadeIn',
		'p ...어? 저 건물 유리창에 누가──',
		'유리창 너머로 누군가의 실루엣이 보인 것 같았다.',
		{'Function': {
			'Apply': function () { monogatari.distractionFree(); },
			'Revert': function () { monogatari.distractionFree(); }
		}},
		'show scene silhouette_cg with fadeIn',
		'wait 3000',
		'show scene another_building_day with fadeIn',
		{'Function': {
			'Apply': function () { monogatari.distractionFree(); },
			'Revert': function () { monogatari.distractionFree(); }
		}},
		'gallery unlock silhouette',
		'show character p surprised at center with fadeIn',
		'p ...기분 탓인가.',
		'고개를 갸웃하며 다시 걷기 시작한다.',
		'hide character p with fadeOut',
		'show scene school_grounds_evening with fadeIn',
		'벚꽃 나무 아래서 오늘 하루를 떠올린다.',
		'show character p normal at center with fadeIn',
		'p 내일은 또 어떤 일이 있을까...',
		'hide character p with fadeOut',
		'show scene #000000 with fadeIn',
		'이불 속에서 오늘 하루를 되짚는다.',
		{
			'Conditional': {
				'Condition': function () {
					return this.storage ('helped_sora') === true ? 'SoraMemory' : 'HanaMemory';
				},
				'SoraMemory': 'jump Day1NightSora',
				'HanaMemory': 'jump Day1NightHana'
			}
		}
	],

	// ──────────────────────────────────
	//  Day1NightSora — 밤 독백 (소라 루트)
	// ──────────────────────────────────
	'Day1NightSora': [
		'소라가 서류를 건넬 때의 표정이 떠오른다.',
		'부탁하는 것조차 어려워하던 조심스러운 모습.',
		'...그런 소라가 휴게 라운지에서 보여준 작은 미소.',
		'p 소라는... 왜 혼자 있는 게 편하다고 생각하게 된 걸까.',
		'벚꽃 나무 아래의 실루엣, 창틀에 새겨진 낙서── "봄은 금방 지나간다."',
		'p ...내일은 어떤 하루가 될까.',
		...fadeJump('Day2Start', { duration: 800 }),
	],

	// ──────────────────────────────────
	//  Day1NightHana — 밤 독백 (하나 루트)
	// ──────────────────────────────────
	'Day1NightHana': [
		'하나의 환한 웃음이 떠오른다.',
		'끝없이 밝아 보이는데── 가끔 내 표정을 살피던 시선.',
		'...그게 왠지 마음에 걸린다.',
		'p 하나는... 항상 저렇게 밝은 걸까.',
		'벚꽃 나무 아래의 실루엣, 창틀에 새겨진 낙서── "봄은 금방 지나간다."',
		'p ...내일은 어떤 하루가 될까.',
		...fadeJump('Day2Start', { duration: 800 }),
	]
});
