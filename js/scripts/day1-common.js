/* global monogatari */

monogatari.script ({

	// ---- START: Name Input ----
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

	// ---- PROLOGUE ----
	'Prologue': [
		'show scene school_front_day with fadeIn',
		'centered ── 1일차: 벚꽃이 피는 아침 ──',
		'봄바람이 벚꽃 잎을 흩날리는 4월의 아침.',
		'오늘은 사쿠라 학원의 새 학기 첫날이다.',
		'show character p normal at center with fadeIn',
		'p 후아... 드디어 새 학기다. 어떤 만남이 기다리고 있을까.',
		'hide character p with fadeOut',
		'교문을 지나 교실로 향하는 길, 벚꽃 나무 아래에서 한 소녀가 서 있다.',
		'jump SchoolArrival'
	],

	// ---- SCHOOL ARRIVAL: Meet both characters ----
	'SchoolArrival': [
		'show scene classroom_day with slideRight',
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
		'jump MorningEvent'
	],

	// ---- MORNING EVENT: First Choice ----
	'MorningEvent': [
		'show scene classroom2_morning with slideLeft',
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

	// ---- LUNCH TIME: Reactive dialogue based on morning choice ----
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

	'LunchTimeSoraWarm': [
		'show character s happy at left with fadeIn',
		's {{player.name}} 씨! 아까 도와주신 덕분에 서류 정리가 빨리 끝났어요.',
		's 혹시 시간 되시면... 도서관에서 같이 점심 드실래요?',
		's 조용하고 좋은 자리가 있어요. 감사 인사도 제대로 드리고 싶어서...',
		'show character h happy at right with fadeIn',
		'h {{player.name}}~! 옥상에서 같이 밥 먹자! 바람도 시원하고 좋아!',
		'jump LunchTimeChoice'
	],

	'LunchTimeHanaWarm': [
		'show character s normal at left with fadeIn',
		's {{player.name}} 씨, 혹시 시간 되시면... 도서관에서 같이 점심 드실래요?',
		's 조용하고 좋은 자리가 있어요.',
		'show character h laugh at right with fadeIn',
		'h {{player.name}}~! 아까 매점 탐험 재밌었지? 옥상에서 같이 밥 먹자!',
		'h 바람도 시원하고, 아까 산 빵도 같이 먹자~!',
		'jump LunchTimeChoice'
	],

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

	// ---- DAY 1 AFTERNOON: Transition to Day 2 ----
	'Day1Afternoon': [
		'show scene classroom_afternoon with fadeIn',
		'오후 수업이 끝나고, 석양이 교실을 물들인다.',
		'show character p normal at center with fadeIn',
		'p ...오늘 하루가 정말 빠르게 지나갔다.',
		'show character p smile',
		'p ...새 학교에서의 첫날, 좋은 사람들을 만났어.',
		'집으로 돌아가는 길, 벚꽃 나무 아래서 오늘 하루를 떠올린다.',
		'p 내일은 또 어떤 일이 있을까...',
		'hide character p with fadeOut',
		'눈을 감으면 소라의 차분한 미소와 하나의 밝은 웃음이 떠오른다.',
		'jump Day2Start'
	]
});
