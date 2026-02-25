/* global monogatari */

monogatari.script ({

	'Day2Start': [
		'show scene #2c1810 with fadeIn',
		'centered ── 2일차: 가까워지는 마음 ──',
		'show scene #fce4ec with fadeIn',
		'사쿠라 학원에서의 둘째 날.',
		'어젯밤, 두 사람의 얼굴이 떠올라 잠을 설쳤다.',
		'show character p worried at center with fadeIn',
		'p ...왜 이렇게 두근거리는 걸까.',
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

	// ---- Conditional greeting based on Day 1 ----
	'Day2SoraGreeting': [
		'show character s happy at left with fadeIn',
		's {{player.name}} 씨, 좋은 아침이에요.',
		's 어제 도와주셔서 정말 감사했어요. 오늘도 잘 부탁드려요.',
		'소라가 평소보다 밝은 표정으로 인사한다.',
		'show character h surprised at right with fadeIn',
		'h 앗! 너희 둘 벌써 친해진 거야? 나도 끼워줘~!',
		'jump Day2Morning'
	],

	'Day2HanaGreeting': [
		'show character h happy at right with fadeIn',
		'h {{player.name}}~! 좋은 아침! 오늘도 재밌게 놀자!',
		'h 어제 매점 빵 맛있었지? 오늘은 다른 맛 먹어보자!',
		'하나가 달려와서 팔짱을 낀다.',
		'show character s normal at left with fadeIn',
		's ...좋은 아침이에요, {{player.name}} 씨.',
		'소라가 멀리서 조용히 인사한다.',
		'jump Day2Morning'
	],

	// ---- DAY 2 MORNING ----
	'Day2Morning': [
		'show scene #e8eaf6 with slideLeft',
		'2교시가 끝나고, 담임 선생님이 공지를 한다.',
		'"내일 있을 학교 축제 준비를 시작하겠습니다. 2인 1조로 팀을 구성하세요."',
		'show character s worried at left with fadeIn',
		's {{player.name}} 씨... 혹시, 저와 같이 준비하실래요?',
		'소라가 조심스럽게 다가와 물어본다.',
		'show character h laugh at right with fadeIn',
		'h {{player.name}}! 나랑 같이 하자! 우리 팀이면 완전 재밌을 거야!',
		'하나가 신나서 뛰어온다.',
		'show character p normal at center with fadeIn',
		{
			'Choice': {
				'Dialog': 'p ...누구와 팀을 할까?',
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

	'Day2NeutralEvening': [
		'show scene #ffcc80 with fadeIn',
		function () {
			this.storage ({
				sora_affection: this.storage ('sora_affection') + 1,
				hana_affection: this.storage ('hana_affection') + 1
			});
		},
		'교문을 나서려는데, 소라와 하나가 나란히 서 있다.',
		'show character s normal at left with fadeIn',
		's 아, {{player.name}} 씨. 같이 가실래요?',
		'show character h happy at right with fadeIn',
		'h 셋이서 가자! 오늘도 재밌었다~!',
		'셋이서 나란히 걸으며 하교한다.',
		'show character p smile at center with fadeIn',
		'p ...이 순간이 계속되면 좋겠다.',
		'벚꽃 잎이 세 사람의 어깨 위로 내려앉는다.',
		'hide character p',
		'hide character s',
		'hide character h',
		'jump Day2End'
	],

	'Day2End': [
		'show scene #1a1a2e with fadeIn',
		'집에 돌아와 침대에 누워 천장을 바라본다.',
		'show character p normal at center with fadeIn',
		'p ...내일은 축제다.',
		'p ...누구와 함께 보내게 될까.',
		'hide character p with fadeOut',
		'설레는 마음을 안고, 서서히 잠이 든다.',
		'jump Day3Start'
	]
});
