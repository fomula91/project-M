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
// GAME SCRIPT - Project M: 사쿠라 학원
// Day 1 → Day 2 → Day 3 (Endings)
// ============================================================

monogatari.script ({

	// ============================================================
	// DAY 1
	// ============================================================

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
		'centered ── 1일차: 벚꽃이 피는 아침 ──',
		'봄바람이 벚꽃 잎을 흩날리는 4월의 아침.',
		'오늘은 사쿠라 학원의 새 학기 첫날이다.',
		'{{player.name}} 후아... 드디어 새 학기다. 어떤 만남이 기다리고 있을까.',
		'교문을 지나 교실로 향하는 길, 벚꽃 나무 아래에서 한 소녀가 서 있다.',
		'jump SchoolArrival'
	],

	// ---- SCHOOL ARRIVAL: Meet both characters ----
	'SchoolArrival': [
		'show scene #ffe4e1 with slideRight',
		'교실에 들어서자, 두 사람이 눈에 들어온다.',
		's 안녕하세요. 저는 이 반의 학급위원 소라입니다.',
		's 새로 오신 분이군요. 잘 부탁드립니다.',
		'조용하지만 단정한 인상의 소녀가 차분하게 인사한다.',
		'h 앗! 새로운 친구다! 안녕안녕~! 나는 하나!',
		'h 우리 같은 반이네! 앞으로 잘 지내자~!',
		'밝은 미소로 다가오는 활발한 소녀.',
		'{{player.name}} ...두 사람 다 인상적이네. 잘 지낼 수 있겠지?',
		'jump MorningEvent'
	],

	// ---- MORNING EVENT: First Choice ----
	'MorningEvent': [
		'show scene #f0f8ff with slideLeft',
		'쉬는 시간, 복도에서 소란이 들린다.',
		's 저기... 죄송한데, 이 서류들을 교무실까지 옮겨야 하는데...',
		'소라가 잔뜩 쌓인 서류를 들고 힘겨워하고 있다.',
		'h {{player.name}}~! 나랑 같이 학교 탐험하러 가자! 매점에 새로 나온 빵이 있대!',
		'하나가 신나서 손을 잡아끈다.',
		{
			'Choice': {
				'Dialog': '{{player.name}} ...어떻게 하지?',
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
		'show scene #fff0f5 with slideRight',
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
				'Dialog': '{{player.name}} ...어디로 갈까?',
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
		'show scene #d4e6f1 with slideLeft',
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
		'{{player.name}} ...소라의 이런 모습은 처음 보네. 귀엽다.',
		'창밖으로 벚꽃잎이 흩날린다. 평화로운 점심시간.',
		'jump Day1Afternoon'
	],

	// ---- ROOFTOP (hana +1) ----
	'Rooftop': [
		'show scene #87ceeb with slideRight',
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
		'{{player.name}} ...하나는 정말 밝은 아이다. 같이 있으면 나까지 즐거워져.',
		'jump Day1Afternoon'
	],

	// ---- DAY 1 AFTERNOON: Transition to Day 2 ----
	'Day1Afternoon': [
		'show scene #ffefd5 with fadeIn',
		'오후 수업이 끝나고, 석양이 교실을 물들인다.',
		'{{player.name}} ...오늘 하루가 정말 빠르게 지나갔다.',
		'{{player.name}} ...새 학교에서의 첫날, 좋은 사람들을 만났어.',
		'집으로 돌아가는 길, 벚꽃 나무 아래서 오늘 하루를 떠올린다.',
		'{{player.name}} 내일은 또 어떤 일이 있을까...',
		'눈을 감으면 소라의 차분한 미소와 하나의 밝은 웃음이 떠오른다.',
		'jump Day2Start'
	],

	// ============================================================
	// DAY 2
	// ============================================================

	'Day2Start': [
		'show scene #2c1810 with fadeIn',
		'centered ── 2일차: 가까워지는 마음 ──',
		'show scene #fce4ec with fadeIn',
		'사쿠라 학원에서의 둘째 날.',
		'어젯밤, 두 사람의 얼굴이 떠올라 잠을 설쳤다.',
		'{{player.name}} ...왜 이렇게 두근거리는 걸까.',
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

	// ---- Conditional greeting based on Day 1 ----
	'Day2SoraGreeting': [
		's {{player.name}} 씨, 좋은 아침이에요.',
		's 어제 도와주셔서 정말 감사했어요. 오늘도 잘 부탁드려요.',
		'소라가 평소보다 밝은 표정으로 인사한다.',
		'h 앗! 너희 둘 벌써 친해진 거야? 나도 끼워줘~!',
		'jump Day2Morning'
	],

	'Day2HanaGreeting': [
		'h {{player.name}}~! 좋은 아침! 오늘도 재밌게 놀자!',
		'h 어제 매점 빵 맛있었지? 오늘은 다른 맛 먹어보자!',
		'하나가 달려와서 팔짱을 낀다.',
		's ...좋은 아침이에요, {{player.name}} 씨.',
		'소라가 멀리서 조용히 인사한다.',
		'jump Day2Morning'
	],

	// ---- DAY 2 MORNING ----
	'Day2Morning': [
		'show scene #e8eaf6 with slideLeft',
		'2교시가 끝나고, 담임 선생님이 공지를 한다.',
		'"내일 있을 학교 축제 준비를 시작하겠습니다. 2인 1조로 팀을 구성하세요."',
		's {{player.name}} 씨... 혹시, 저와 같이 준비하실래요?',
		'소라가 조심스럽게 다가와 물어본다.',
		'h {{player.name}}! 나랑 같이 하자! 우리 팀이면 완전 재밌을 거야!',
		'하나가 신나서 뛰어온다.',
		{
			'Choice': {
				'Dialog': '{{player.name}} ...누구와 팀을 할까?',
				'WithSora': {
					'Text': '소라와 함께한다',
					'Do': 'jump Day2WithSora'
				},
				'WithHana': {
					'Text': '하나와 함께한다',
					'Do': 'jump Day2WithHana'
				}
			}
		}
	],

	// ---- DAY 2: With Sora (sora +2) ----
	'Day2WithSora': [
		'show scene #d1c4e9 with fadeIn',
		function () {
			this.storage ({
				sora_affection: this.storage ('sora_affection') + 2,
				day2_studied_together: true
			});
		},
		'{{player.name}} 소라 씨, 같이 하죠.',
		's ...! 네, 감사합니다.',
		'소라의 눈이 반짝인다. 처음 보는 표정이다.',
		'h 에에~ 아쉽다... 그럼 나는 다른 친구한테 가볼게!',
		'하나가 아쉬운 표정을 지으며 웃는다.',
		'방과 후, 교실에서 둘이서 축제 준비를 시작한다.',
		's 저는... 장식을 만드는 건 자신 있어요.',
		's 이 종이학을 봐주세요. 이런 식으로 장식하면 어떨까요?',
		'소라가 정성스럽게 접은 종이학을 보여준다.',
		'{{player.name}} 와, 정말 예쁘다. 소라 씨 손재주가 대단하네요.',
		's 에... 칭찬은 좀 부끄럽지만... 고마워요.',
		'소라가 얼굴을 붉히며 작은 종이학 하나를 건넨다.',
		's 이건... {{player.name}} 씨에게 드리는 거예요. 행운의 부적이라고 생각해주세요.',
		'{{player.name}} 소중하게 간직할게요.',
		'소라가 수줍게 미소 짓는다. 심장이 두근거린다.',
		'jump Day2Evening'
	],

	// ---- DAY 2: With Hana (hana +2) ----
	'Day2WithHana': [
		'show scene #fce4ec with slideRight',
		function () {
			this.storage ({
				hana_affection: this.storage ('hana_affection') + 2
			});
		},
		'{{player.name}} 하나, 같이 하자!',
		'h 진짜?! 최고! 우리 팀 무적이다!',
		'하나가 기뻐하며 껑충 뛰어오른다.',
		's 그렇군요... 열심히 해주세요.',
		'소라가 조용히 미소를 지으며 돌아선다.',
		'방과 후, 하나와 함께 교실을 꾸미기 시작한다.',
		'h 여기에 풍선 달고, 저기에 리본도 달자!',
		'h {{player.name}}, 이 왕관 써봐! 내가 만든 거야!',
		'종이로 만든 왕관을 머리에 씌워주는 하나.',
		'{{player.name}} 하하, 이게 뭐야?',
		'h 에헤~ 축제의 왕자님! 어울린다~',
		'h 사실 나, 오늘 정말 즐거워. {{player.name}}랑 같이라서 그런 것 같아.',
		'하나가 갑자기 진지한 표정을 짓는다.',
		'h ...내일 축제 때도 같이 다니자. 약속!',
		'{{player.name}} 약속할게.',
		'하나의 눈이 별처럼 빛난다.',
		'jump Day2Evening'
	],

	// ---- DAY 2 EVENING ----
	'Day2Evening': [
		'show scene #ff8a65 with fadeIn',
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

	'Day2SoraEvening': [
		'show scene #7986cb with fadeIn',
		'복도에서 소라를 마주친다. 소라가 창밖을 바라보고 있다.',
		's ...아, {{player.name}} 씨.',
		'{{player.name}} 아직 안 갔어요?',
		's 네... 석양이 예뻐서 잠깐 보고 있었어요.',
		's {{player.name}} 씨는... 석양 좋아하세요?',
		'{{player.name}} 네, 좋아해요.',
		's ...저도요. 특히 이 학교에서 보는 석양은 특별해요.',
		's 내일이... 기대돼요. {{player.name}} 씨와 함께니까.',
		'소라가 처음으로 환하게 웃는다.',
		'{{player.name}} ...저도요, 소라 씨.',
		'두 사람 사이로 석양빛이 부드럽게 비춘다.',
		'jump Day2End'
	],

	'Day2HanaEvening': [
		'show scene #ef9a9a with fadeIn',
		'교문 앞에서 하나가 기다리고 있다.',
		'h {{player.name}}! 여기여기!',
		'{{player.name}} 하나? 기다리고 있었어?',
		'h 응! 같이 가고 싶어서~',
		'하나와 나란히 걷기 시작한다.',
		'h 있잖아, {{player.name}}...',
		'h 나, 오늘 정말 행복했어.',
		'{{player.name}} 나도 즐거웠어.',
		'h 에헤... 그 말 듣으니까 더 행복해진다.',
		'하나가 살짝 얼굴을 붉히며 하늘을 올려다본다.',
		'h 내일... 꼭 같이 축제 돌아다니자. 절대 약속!',
		'{{player.name}} 응, 약속.',
		'석양 속 하나의 미소가 유독 아름답게 보인다.',
		'jump Day2End'
	],

	'Day2NeutralEvening': [
		'show scene #ffcc80 with fadeIn',
		'교문을 나서려는데, 소라와 하나가 나란히 서 있다.',
		's 아, {{player.name}} 씨. 같이 가실래요?',
		'h 셋이서 가자! 오늘도 재밌었다~!',
		'셋이서 나란히 걸으며 하교한다.',
		'{{player.name}} ...이 순간이 계속되면 좋겠다.',
		'벚꽃 잎이 세 사람의 어깨 위로 내려앉는다.',
		'jump Day2End'
	],

	'Day2End': [
		'show scene #1a1a2e with fadeIn',
		'집에 돌아와 침대에 누워 천장을 바라본다.',
		'{{player.name}} ...내일은 축제다.',
		'{{player.name}} ...누구와 함께 보내게 될까.',
		'설레는 마음을 안고, 서서히 잠이 든다.',
		'jump Day3Start'
	],

	// ============================================================
	// DAY 3 - CLIMAX + ENDINGS
	// ============================================================

	'Day3Start': [
		'show scene #1a0a1e with fadeIn',
		'centered ── 3일차: 축제, 그리고... ──',
		'show scene #fff8e1 with fadeIn',
		'축제 당일 아침.',
		'학교 전체가 활기로 가득하다. 풍선, 리본, 현수막이 곳곳에 걸려 있다.',
		'{{player.name}} 드디어 축제다...',
		{
			'Conditional': {
				'Condition': function () {
					var sora = this.storage ('sora_affection');
					var hana = this.storage ('hana_affection');
					if (sora >= 5 && hana >= 5) {
						return 'BothHigh';
					} else if (sora > hana) {
						return 'SoraHigh';
					} else if (hana > sora) {
						return 'HanaHigh';
					} else {
						return 'Balanced';
					}
				},
				'BothHigh': 'jump Day3BothHigh',
				'SoraHigh': 'jump Day3SoraRoute',
				'HanaHigh': 'jump Day3HanaRoute',
				'Balanced': 'jump Day3Balanced'
			}
		}
	],

	// ---- Hidden Ending Path: Both affections high ----
	'Day3BothHigh': [
		'show scene #ffe0b2 with slideRight',
		'교실에 들어서자 소라와 하나가 동시에 다가온다.',
		's {{player.name}} 씨, 오늘 축제... 같이 돌아볼래요?',
		'h {{player.name}}! 나랑 같이 돌아다니기로 했잖아!',
		's ...에? 하나 씨, 저도 {{player.name}} 씨와 약속이...',
		'h 에에?! 소라도?!',
		'두 사람이 서로를 바라보며 당혹스러운 표정을 짓는다.',
		'{{player.name}} ...이건 어떻게 해야 하지.',
		{
			'Choice': {
				'Dialog': '{{player.name}} ...어떻게 하면 좋을까?',
				'ChooseSora': {
					'Text': '소라와 함께 축제를 돌아본다',
					'Do': 'jump Day3SoraRoute'
				},
				'ChooseHana': {
					'Text': '하나와 함께 축제를 돌아본다',
					'Do': 'jump Day3HanaRoute'
				},
				'ChooseBoth': {
					'Text': '셋이서 같이 다니자!',
					'Do': 'jump Day3TogetherRoute'
				}
			}
		}
	],

	// ---- Day 3: Balanced (equal affection) ----
	'Day3Balanced': [
		'show scene #ffe0b2 with fadeIn',
		'교실에 들어서자 소라와 하나가 나란히 앉아 이야기를 나누고 있다.',
		'h 아! {{player.name}}! 와와, 오늘 축제 같이 돌자!',
		's 네, {{player.name}} 씨도 함께해요.',
		'두 사람의 따뜻한 웃음이 나를 맞이한다.',
		'jump Day3TogetherRoute'
	],

	// ---- Day 3: Sora Route ----
	'Day3SoraRoute': [
		'show scene #bbdefb with slideLeft',
		function () {
			this.storage ({
				sora_affection: this.storage ('sora_affection') + 1
			});
		},
		'소라와 함께 축제를 돌아본다.',
		's 이쪽에... 전시실이 있어요. 미술부에서 준비한 거래요.',
		'{{player.name}} 같이 가보자.',
		'조용한 전시실 안, 벚꽃을 주제로 한 그림들이 걸려 있다.',
		's ...이 그림, 예쁘지 않아요?',
		'소라가 벚꽃 풍경화 앞에 멈춰 선다.',
		'{{player.name}} 정말 예쁘네요. 근데 소라 씨가 더 예뻐요.',
		's ...?!',
		'소라의 얼굴이 새빨개진다.',
		's 그, 그런 말... 갑자기...',
		'{{player.name}} 하하, 솔직한 감상이에요.',
		's .........감사합니다.',
		'소라가 고개를 숙이며 작게 웃는다.',
		'jump Day3SoraClimax'
	],

	'Day3SoraClimax': [
		'show scene #5c6bc0 with fadeIn',
		'축제가 끝나고, 석양이 학교를 물들인다.',
		'소라와 함께 교정을 걷는다.',
		's {{player.name}} 씨... 저, 할 말이 있어요.',
		'소라가 벚꽃 나무 아래에서 발을 멈춘다.',
		's 저는 원래... 사람과 가까워지는 게 무서웠어요.',
		's 혼자가 편하다고 생각했어요. 그게 저를 지키는 방법이라고...',
		's 그런데 {{player.name}} 씨를 만나고... 달라졌어요.',
		's 처음으로... 누군가의 옆에 있고 싶다고 느꼈어요.',
		'소라의 눈에 석양빛이 반사된다.',
		{
			'Choice': {
				'Dialog': '{{player.name}} 소라 씨...',
				'Confess': {
					'Text': '나도 같은 마음이에요.',
					'Do': 'jump SoraConfess'
				},
				'Gentle': {
					'Text': '앞으로도 좋은 친구로 지내요.',
					'Do': 'jump SoraFriendEnd'
				}
			}
		}
	],

	'SoraConfess': [
		function () {
			this.storage ({
				sora_affection: this.storage ('sora_affection') + 2,
				confessed: true
			});
		},
		'{{player.name}} 소라 씨, 저도... 같은 마음이에요.',
		'{{player.name}} 처음 만났을 때부터 신경이 쓰였어요.',
		's {{player.name}} 씨...',
		'소라의 눈가에 눈물이 맺힌다.',
		's 이런 감정은... 처음이에요.',
		's 저도, {{player.name}} 씨 옆에 있고 싶어요. 계속...',
		'벚꽃잎이 두 사람 사이로 흩날린다.',
		'소라가 조심스럽게 내 손을 잡는다. 작지만 따뜻한 손.',
		'{{player.name}} ...소라 씨의 손, 따뜻하네요.',
		's 그건... {{player.name}} 씨 때문이에요.',
		'석양빛 속에서 소라가 미소 짓는다.',
		'이 순간이 영원히 계속되길 바라며, 소라의 손을 꼭 잡았다.',
		'show scene #b0c4de with fadeIn',
		'centered ── 소라 엔딩: 조용한 봄의 시작 ──',
		'end'
	],

	'SoraFriendEnd': [
		's ...그렇죠. 좋은 친구... 감사해요, {{player.name}} 씨.',
		'소라가 살짝 슬픈 미소를 짓지만, 이내 밝은 표정을 되찾는다.',
		's 앞으로도 잘 부탁드려요.',
		'{{player.name}} ...소라 씨, 꼭.',
		'벚꽃이 흩날리는 교정에서 두 사람은 나란히 집으로 향한다.',
		'show scene #b0c4de with fadeIn',
		'centered ── 소라 엔딩: 소중한 거리 ──',
		'end'
	],

	// ---- Day 3: Hana Route ----
	'Day3HanaRoute': [
		'show scene #f8bbd0 with slideRight',
		function () {
			this.storage ({
				hana_affection: this.storage ('hana_affection') + 1
			});
		},
		'하나와 함께 축제를 돌아본다.',
		'h 와~! 이거 봐이거 봐! 솜사탕이다!',
		'h {{player.name}}! 같이 먹자!',
		'{{player.name}} 하하, 그래!',
		'하나에 이끌려 이곳저곳을 돌아다닌다.',
		'h 여기도 가보자! 점술 카페래! 운세 봐주는 곳!',
		'하나가 신나서 뛰어간다.',
		'h "오늘 중요한 사람에게 마음을 전하세요" 래! 에헤~',
		'하나가 점술 결과를 보며 갑자기 말을 멈춘다.',
		'{{player.name}} 하나? 왜 그래?',
		'h ...아, 아무것도 아니야! 가자가자!',
		'하나가 살짝 얼굴을 붉히며 서둘러 걸어간다.',
		'jump Day3HanaClimax'
	],

	'Day3HanaClimax': [
		'show scene #e57373 with fadeIn',
		'축제가 끝나고, 하교 시간.',
		'h {{player.name}}... 잠깐만!',
		'하나가 교문 앞에서 나를 붙잡는다.',
		'h 저기... 좀 걸을래?',
		'{{player.name}} 응, 좋아.',
		'하나와 함께 벚꽃길을 걷는다. 하나가 평소와 달리 조용하다.',
		'h {{player.name}}... 나, 할 말이 있어.',
		'h 나 원래 항상 웃으면서 다니잖아. 밝은 게 좋으니까.',
		'h 근데... {{player.name}} 앞에서는 웃는 것만으로는 부족한 기분이 들어.',
		'h 진짜 내 마음을 보여주고 싶달까...',
		'하나가 발을 멈추고 나를 똑바로 바라본다.',
		'h {{player.name}}, 나... 너 좋아해.',
		'h 친구로서가 아니라, 진짜로.',
		{
			'Choice': {
				'Dialog': '{{player.name}} 하나...',
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

	'HanaConfess': [
		function () {
			this.storage ({
				hana_affection: this.storage ('hana_affection') + 2,
				confessed: true
			});
		},
		'{{player.name}} 하나, 나도... 너 좋아해.',
		'h ...진짜?!',
		'하나의 눈이 크게 뜨인다. 그리고 눈물이 고인다.',
		'h 나, 나 지금 울면 안 되는데... 헤헤...',
		'h 너무 좋아서 눈물이 나는 건 처음이야.',
		'{{player.name}} 울어도 돼. 나 여기 있으니까.',
		'h {{player.name}}... 고마워. 정말 정말 고마워.',
		'하나가 내 품에 안기며 웃음과 눈물을 동시에 보인다.',
		'벚꽃잎이 두 사람을 감싸며 춤추듯 흩날린다.',
		'h 나, {{player.name}} 옆에 평생 있을 거야. 약속!',
		'{{player.name}} 나도, 약속.',
		'벚꽃 비가 내리는 하교길, 하나와 손을 맞잡고 걸어간다.',
		'show scene #ffb6c1 with fadeIn',
		'centered ── 하나 엔딩: 벚꽃빛 하교길 ──',
		'end'
	],

	'HanaFriendEnd': [
		'h ...그렇구나. 에헤, 역시 나 욕심이었나~',
		'하나가 눈물을 참으며 밝게 웃어 보인다.',
		'h 괜찮아! 우리 절친이니까! 그걸로 충분해!',
		'{{player.name}} 하나... 고마워.',
		'h 울지마! 나 괜찮다고~! ...에헤.',
		'하나가 웃는 얼굴로 손을 흔들며 하교한다.',
		'{{player.name}} ...미안, 하나.',
		'show scene #ffb6c1 with fadeIn',
		'centered ── 하나 엔딩: 변하지 않는 밝은 미소 ──',
		'end'
	],

	// ---- Day 3: Together Route (friendship or hidden) ----
	'Day3TogetherRoute': [
		'show scene #fff9c4 with slideRight',
		function () {
			this.storage ({
				chose_both: true
			});
		},
		'셋이서 축제를 돌아본다.',
		'h 솜사탕 사자! 셋이서 나눠 먹자!',
		's 에... 저는 달콤한 건 좀...',
		'h 에이~ 맛있으니까 먹어봐!',
		'소라와 하나가 티격태격하는 모습에 나도 모르게 웃음이 난다.',
		'{{player.name}} 하하, 너희 둘 정말 사이좋다.',
		's 에...? 그, 그런가요?',
		'h 어? 우리 사이 좋았어? 에헤~',
		'셋이서 점술 카페, 전시실, 매점을 돌아다닌다.',
		'정신없이 즐거운 시간이 흘러간다.',
		'jump Day3TogetherClimax'
	],

	'Day3TogetherClimax': [
		'show scene #ffab91 with fadeIn',
		'축제가 끝나갈 무렵, 옥상에서 셋이 석양을 바라본다.',
		's ...오늘 정말 즐거웠어요.',
		'h 응! 최고의 축제였어!',
		'{{player.name}} 나도... 너희 덕분에 정말 행복했어.',
		'h {{player.name}}... 우리 앞으로도 계속 이렇게 지내자!',
		's 네... 저도 같은 마음이에요.',
		{
			'Conditional': {
				'Condition': function () {
					var sora = this.storage ('sora_affection');
					var hana = this.storage ('hana_affection');
					if (sora >= 5 && hana >= 5 && this.storage ('chose_both') === true) {
						return 'HiddenPath';
					} else {
						return 'FriendPath';
					}
				},
				'HiddenPath': 'jump HiddenEnding',
				'FriendPath': 'jump FriendshipEnding'
			}
		}
	],

	// ---- HIDDEN ENDING: Sakura Promise ----
	'HiddenEnding': [
		'show scene #e1bee7 with fadeIn',
		'갑자기 바람이 불며 벚꽃잎이 옥상 위로 솟구친다.',
		'말 그대로 벚꽃 비가 내린다.',
		'h 와...! 진짜 예쁘다!',
		's 이건... 마치 마법 같아요.',
		'세 사람 모두 말을 잃고 벚꽃 비를 바라본다.',
		'{{player.name}} ...있잖아, 둘 다.',
		's 네?',
		'h 응?',
		'{{player.name}} 전학 와서 불안했는데... 너희를 만나서 정말 다행이야.',
		'{{player.name}} 소라의 차분한 따뜻함도, 하나의 밝은 에너지도...',
		'{{player.name}} 둘 다 없으면 안 될 만큼 소중해.',
		's {{player.name}} 씨...',
		'h {{player.name}}...',
		'소라가 내 오른손을, 하나가 왼손을 잡는다.',
		's 저도... {{player.name}} 씨와 하나를 만나서 세상이 달라졌어요.',
		'h 나도! 셋이서 함께라서 매일이 즐거워!',
		'{{player.name}} 그래, 우리 셋이서... 이 봄을 함께 걸어가자.',
		'벚꽃잎이 세 사람을 감싸며 원을 그린다.',
		'마치 이 인연을 축복하듯이.',
		'show scene #ce93d8 with fadeIn',
		'centered ── 히든 엔딩: 벚꽃의 약속 ──',
		'end'
	],

	// ---- FRIENDSHIP ENDING ----
	'FriendshipEnding': [
		'show scene #ffe4b5 with fadeIn',
		'세 사람이 옥상에서 나란히 석양을 바라본다.',
		's 벌써 축제가 끝나네요...',
		'h 아쉽다~ 내일부터 다시 수업이잖아~',
		'{{player.name}} 하하, 그래도 오늘 정말 즐거웠어.',
		's 네, 정말... 이렇게 즐거운 건 오랜만이에요.',
		'h 내일도, 모레도, 계속 이렇게 함께하자!',
		'{{player.name}} 물론이지.',
		'벚꽃 나무 아래, 세 사람의 웃음소리가 퍼진다.',
		'이렇게, 사쿠라 학원에서의 새로운 이야기가 시작되었다.',
		'show scene #ffe4b5 with fadeIn',
		'centered ── 우정 엔딩: 세 사람의 봄 ──',
		'end'
	]
});
