/* global monogatari */

// Define the messages used in the game.
monogatari.action ('message').messages ({

});

// Define the notifications used in the game
monogatari.action ('notification').notifications ({

});

// Define the Particles JS Configurations used in the game
monogatari.action ('particles').particles ({

});

// Define the canvas objects used in the game
monogatari.action ('canvas').objects ({

});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration ('credits', {

});

// Define the images that will be available on your game's image gallery
monogatari.assets ('gallery', {

});

// Define the music used in the game.
monogatari.assets ('music', {

});

// Define the voice files used in the game.
monogatari.assets ('voices', {

});

// Define the sounds used in the game.
monogatari.assets ('sounds', {

});

// Define the videos used in the game.
monogatari.assets ('videos', {

});

// Define the images used in the game.
monogatari.assets ('images', {

});

// Define the backgrounds for each scene.
// Phase 1: CSS color backgrounds (no image files needed)
monogatari.assets ('scenes', {

});

// Define the Characters
monogatari.characters ({
	's': {
		name: '소라',
		color: '#4a90d9'
	},
	'h': {
		name: '하나',
		color: '#e87ba1'
	}
});

// ============================================================
// GAME SCRIPT
// ============================================================

monogatari.script ({

	// ---- START: Name Input ----
	'Start': [
		'show scene #f5e6ca with fadeIn',
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
		'show scene #87ceeb with fadeIn',
		'봄바람이 벚꽃 잎을 흩날리는 4월의 아침.',
		'오늘은 사쿠라 학원의 새 학기 첫날이다.',
		'{{player.name}} 후아... 드디어 새 학기다. 어떤 만남이 기다리고 있을까.',
		'교문을 지나 교실로 향하는 길, 벚꽃 나무 아래에서 한 소녀가 서 있다.',
		'jump SchoolArrival'
	],

	// ---- SCHOOL ARRIVAL: Meet both characters ----
	'SchoolArrival': [
		'show scene #ffe4e1 with fadeIn',
		'교실에 들어서자, 두 사람이 눈에 들어온다.',
		's 안녕하세요. 저는 이 반의 학급위원 소라입니다.',
		's 새로 오신 분이군요. 잘 부탁드립니다.',
		'조용하지만 단정한 인상의 소녀가 차분하게 인사한다.',
		'h 앗! 새로운 친구다! 안녕안녕~! 나는 하나!',
		'h 우리 같은 반이네! 앞으로 잘 지내자~!',
		'밝은 미소로 다가오는 활발한 소녀.',
		'{{player.name}} (두 사람 다 인상적이네... 잘 지낼 수 있겠지?)',
		'jump MorningEvent'
	],

	// ---- MORNING EVENT: First Choice ----
	'MorningEvent': [
		'show scene #f0f8ff with fadeIn',
		'쉬는 시간, 복도에서 소란이 들린다.',
		's 저기... 죄송한데, 이 서류들을 교무실까지 옮겨야 하는데...',
		'소라가 잔뜩 쌓인 서류를 들고 힘겨워하고 있다.',
		'h {{player.name}}~! 나랑 같이 학교 탐험하러 가자! 매점에 새로 나온 빵이 있대!',
		'하나가 신나서 손을 잡아끈다.',
		{
			'Choice': {
				'Dialog': '{{player.name}} (어떻게 하지...?)',
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

	// ---- HELP SORA (sora +2) ----
	'HelpSora': [
		'show scene #e6e6fa with fadeIn',
		function () {
			this.storage ({
				sora_affection: this.storage ('sora_affection') + 2,
				helped_sora: true
			});
		},
		'{{player.name}} 소라 씨, 제가 도와드릴게요.',
		's 정말요? 감사합니다...',
		'소라의 표정이 살짝 밝아진다.',
		'함께 서류를 나눠 들고 교무실로 향한다.',
		's 전학 오자마자 이런 일을 도와주시다니... 정말 착하시네요.',
		'{{player.name}} 아닙니다. 당연한 거죠.',
		's ...고마워요. 사실 저는 사람들에게 부탁하는 게 좀 어려워서...',
		's 앞으로도 잘 부탁드려요, {{player.name}} 씨.',
		'소라가 작게 미소 짓는다. 왠지 가슴이 따뜻해진다.',
		'jump LunchTime'
	],

	// ---- GO WITH HANA (hana +2) ----
	'GoWithHana': [
		'show scene #fff0f5 with fadeIn',
		function () {
			this.storage ({
				hana_affection: this.storage ('hana_affection') + 2,
				helped_sora: false
			});
		},
		'{{player.name}} 좋아, 같이 가자 하나!',
		'h 야호~! 가자가자!',
		'하나에 이끌려 학교 곳곳을 돌아다닌다.',
		'h 여기가 매점! 그리고 저기가 체육관! 아, 그리고 옥상도 갈 수 있어!',
		'{{player.name}} 하하, 너 정말 활발하다.',
		'h 에헤헤~ 새 친구랑 같이 다니니까 더 신나지!',
		'h {{player.name}}는 정말 재밌는 사람이야. 우리 절친하자!',
		'하나의 밝은 에너지에 나도 모르게 웃음이 난다.',
		'jump LunchTime'
	],

	// ---- LUNCH TIME: Second Choice ----
	'LunchTime': [
		'show scene #fafad2 with fadeIn',
		'점심시간이 되었다.',
		'오늘은 어디서 점심을 먹을까 고민하는데...',
		's {{player.name}} 씨, 혹시 시간 되시면... 도서관에서 같이 점심 드실래요?',
		's 조용하고 좋은 자리가 있어요.',
		'h {{player.name}}~! 옥상에서 같이 밥 먹자! 바람도 시원하고 좋아!',
		{
			'Choice': {
				'Dialog': '{{player.name}} (어디로 갈까...?)',
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

	// ---- LIBRARY (sora +1) ----
	'Library': [
		'show scene #d4e6f1 with fadeIn',
		function () {
			this.storage ({
				sora_affection: this.storage ('sora_affection') + 1,
				chose_library: true
			});
		},
		'{{player.name}} 소라 씨, 도서관으로 가죠.',
		's 네! 이쪽으로 오세요.',
		'도서관 한쪽 구석, 창가 자리에 앉는다.',
		's 여기 제가 좋아하는 자리예요. 조용하고, 햇살이 잘 들어서...',
		'{{player.name}} 정말 좋은 자리네요.',
		's 사실... 이 자리에 다른 사람을 데려온 건 처음이에요.',
		'소라가 얼굴을 살짝 붉히며 말한다.',
		's {{player.name}} 씨는... 왠지 편안해요.',
		'{{player.name}} (소라의 이런 모습은 처음 보네... 귀엽다.)',
		'창밖으로 벚꽃잎이 흩날린다. 평화로운 점심시간.',
		'jump Afternoon'
	],

	// ---- ROOFTOP (hana +1) ----
	'Rooftop': [
		'show scene #87ceeb with fadeIn',
		function () {
			this.storage ({
				hana_affection: this.storage ('hana_affection') + 1,
				chose_library: false
			});
		},
		'{{player.name}} 하나, 옥상으로 가자!',
		'h 좋아~! 달려!',
		'옥상에서 바라보는 풍경은 장관이다.',
		'h 여기서 보면 벚꽃이 진짜 예쁘지? 나 이 학교에서 여기가 제일 좋아.',
		'{{player.name}} 와, 정말 좋은 곳이다.',
		'h 에헤~ 이건 나만 아는 비밀 장소야. {{player.name}}에게만 알려주는 거다!',
		'{{player.name}} 비밀 장소를 알려줘도 되는 거야?',
		'h {{player.name}}이니까 괜찮지! 우리 이제 특별한 사이잖아~',
		'하나가 장난스럽게 윙크한다.',
		'{{player.name}} (하나는 정말 밝은 아이다... 같이 있으면 나까지 즐거워져.)',
		'jump Afternoon'
	],

	// ---- AFTERNOON: Route to Endings ----
	'Afternoon': [
		'show scene #ffefd5 with fadeIn',
		'오후 수업이 끝나고, 석양이 교실을 물들인다.',
		'{{player.name}} (오늘 하루가 정말 빠르게 지나갔다...)',
		'{{player.name}} (새 학교에서의 첫날, 좋은 사람들을 만났어.)',
		{
			'Conditional': {
				'Condition': function () {
					var sora = this.storage ('sora_affection');
					var hana = this.storage ('hana_affection');

					if (sora > hana) {
						return 'SoraRoute';
					} else if (hana > sora) {
						return 'HanaRoute';
					} else {
						return 'FriendRoute';
					}
				},
				'SoraRoute': 'jump SoraEnding',
				'HanaRoute': 'jump HanaEnding',
				'FriendRoute': 'jump FriendshipEnding'
			}
		}
	],

	// ---- SORA ENDING ----
	'SoraEnding': [
		'show scene #b0c4de with fadeIn',
		'방과 후, 교실에 혼자 남아있는 소라를 발견한다.',
		's 아, {{player.name}} 씨... 아직 안 가셨어요?',
		'{{player.name}} 소라 씨도 아직 남아있네요.',
		's 네, 학급위원 일이 좀 남아서...',
		'{{player.name}} 도와드릴까요?',
		's ...정말요? 오늘 하루 종일 도움을 받기만 하네요.',
		'{{player.name}} 좋은 사람을 도와주는 건 기분 좋은 일이에요.',
		's ......!',
		'소라가 놀란 표정으로 나를 바라보다가, 이내 따뜻한 미소를 짓는다.',
		's {{player.name}} 씨, 저... 이 학교에서 처음으로 가까워지고 싶은 사람이 생겼어요.',
		's 앞으로도... 옆에 있어주실 거죠?',
		'{{player.name}} 물론이죠, 소라 씨.',
		'석양빛이 소라의 미소를 따뜻하게 비춘다.',
		'centered ── 소라 엔딩: 조용한 봄의 시작 ──',
		'end'
	],

	// ---- HANA ENDING ----
	'HanaEnding': [
		'show scene #ffb6c1 with fadeIn',
		'교문을 나서려는데 하나가 달려온다.',
		'h {{player.name}}~! 기다려!',
		'{{player.name}} 하나? 무슨 일이야?',
		'h 헤헤, 그냥... 같이 집에 가고 싶어서!',
		'h 오늘 정말 재밌었거든. {{player.name}}이랑 같이라서!',
		'{{player.name}} 나도 하나 덕분에 즐거웠어.',
		'h 진짜?! 그럼 내일도, 모레도, 계속 같이 다니자!',
		'h 사실은... {{player.name}}이 오늘 처음 왔을 때부터 느꼈어.',
		'h 이 사람이랑은 진짜 좋은 친구가 될 수 있을 거라고!',
		'h 아니, 친구보다... 더 특별한 사이가 될 수도?',
		'하나가 살짝 얼굴을 붉히며 웃는다.',
		'{{player.name}} (하나의 이런 모습은 처음이야... 심장이 뛴다.)',
		'벚꽃잎이 흩날리는 하교길, 하나와 나란히 걸어간다.',
		'centered ── 하나 엔딩: 벚꽃빛 하교길 ──',
		'end'
	],

	// ---- FRIENDSHIP ENDING ----
	'FriendshipEnding': [
		'show scene #ffe4b5 with fadeIn',
		'교문 앞에서 소라와 하나가 함께 서 있다.',
		's {{player.name}} 씨, 잠깐 기다려주세요.',
		'h {{player.name}}~! 우리 셋이 같이 가자!',
		'{{player.name}} 두 사람 다 기다려준 거야?',
		's 네, 첫날이니까 같이 가면 좋을 것 같아서요.',
		'h 맞아맞아! 첫날 기념으로 같이 가야지!',
		'셋이서 나란히 걸으며 하교한다.',
		'h 내일은 같이 도시락 먹자! 내가 맛있는 거 싸올게!',
		's 저도... 차를 준비해올게요.',
		'{{player.name}} 하하, 그래. 내일이 벌써 기대된다.',
		'벚꽃 나무 아래, 세 사람의 웃음소리가 퍼진다.',
		'이렇게, 사쿠라 학원에서의 새로운 이야기가 시작되었다.',
		'centered ── 우정 엔딩: 세 사람의 봄 ──',
		'end'
	]
});
