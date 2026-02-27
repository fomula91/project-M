/* global monogatari */

monogatari.script ({

	// ---- Day 3: Sora Route ----
	'Day3SoraRoute': [
		'show scene classroom3_afternoon with slideLeft',
		function () {
			this.storage ({
				sora_affection: this.storage ('sora_affection') + 1
			});
			AffinityHint.show ('sora');
		},
		'show character s normal at center with fadeIn',
		'소라와 함께 축제를 돌아본다.',
		's 이쪽에... 전시실이 있어요. 미술부에서 준비한 거래요.',
		'show character p smile at right with fadeIn',
		'p 같이 가보자.',
		'조용한 전시실 안, 벚꽃을 주제로 한 그림들이 걸려 있다.',
		's ...이 그림, 예쁘지 않아요?',
		'소라가 벚꽃 풍경화 앞에 멈춰 선다.',
		'p 정말 예쁘네요. 근데 소라 씨가 더 예뻐요.',
		'show character s surprised',
		's ...?!',
		'소라의 얼굴이 새빨개진다.',
		's 그, 그런 말... 갑자기...',
		'p 하하, 솔직한 감상이에요.',
		's .........감사합니다.',
		'show character s happy',
		'소라가 고개를 숙이며 작게 웃는다.',
		'jump Day3SoraClimax'
	],

	'Day3SoraClimax': [
		'show scene school_grounds_evening with fadeIn',
		'show character s normal',
		'축제가 끝나고, 석양이 학교를 물들인다.',
		'소라와 함께 교정을 걷는다.',
		's {{player.name}} 씨... 저, 할 말이 있어요.',
		'소라가 벚꽃 나무 아래에서 발을 멈춘다.',
		'show character s worried',
		's 저는 원래... 사람과 가까워지는 게 무서웠어요.',
		's 혼자가 편하다고 생각했어요. 그게 저를 지키는 방법이라고...',
		's 그런데 {{player.name}} 씨를 만나고... 달라졌어요.',
		's 처음으로... 누군가의 옆에 있고 싶다고 느꼈어요.',
		'소라의 눈에 석양빛이 반사된다.',
		{
			'Choice': {
				'Dialog': 'p 소라 씨...',
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
			AffinityHint.show ('sora');
		},
		'show character p smile at right',
		'p 소라 씨, 저도... 같은 마음이에요.',
		'p 처음 만났을 때부터 신경이 쓰였어요.',
		's {{player.name}} 씨...',
		'show character s surprised',
		'소라의 눈가에 눈물이 맺힌다.',
		's 이런 감정은... 처음이에요.',
		's 저도, {{player.name}} 씨 옆에 있고 싶어요. 계속...',
		'벚꽃잎이 두 사람 사이로 흩날린다.',
		'show character s happy',
		'소라가 조심스럽게 내 손을 잡는다. 작지만 따뜻한 손.',
		'p ...소라 씨의 손, 따뜻하네요.',
		's 그건... {{player.name}} 씨 때문이에요.',
		'석양빛 속에서 소라가 미소 짓는다.',
		'이 순간이 영원히 계속되길 바라며, 소라의 손을 꼭 잡았다.',
		'hide character p with fadeOut',
		'hide character s with fadeOut',
		'show scene auditorium_evening with fadeIn',
		'centered ── 소라 엔딩: 조용한 봄의 시작 ──',
		'end'
	],

	'SoraFriendEnd': [
		'show character p normal at right',
		'show character s worried',
		's ...그렇죠. 좋은 친구... 감사해요, {{player.name}} 씨.',
		'소라가 살짝 슬픈 미소를 짓지만, 이내 밝은 표정을 되찾는다.',
		'show character s normal',
		's 앞으로도 잘 부탁드려요.',
		'p ...소라 씨, 꼭.',
		'벚꽃이 흩날리는 교정에서 두 사람은 나란히 집으로 향한다.',
		'hide character p with fadeOut',
		'hide character s with fadeOut',
		'show scene auditorium_evening with fadeIn',
		'centered ── 소라 엔딩: 소중한 거리 ──',
		'end'
	]
});
