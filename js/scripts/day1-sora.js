/* global monogatari */

monogatari.script ({

	// ---- HELP SORA (sora +2) ----
	'HelpSora': [
		'hide character h with fadeOut',
		'show scene #e6e6fa with fadeIn',
		function () {
			this.storage ({
				sora_affection: this.storage ('sora_affection') + 2,
				helped_sora: true
			});
		},
		'show character s normal at center with fadeIn',
		'p 소라 씨, 제가 도와드릴게요.',
		's 정말요? 감사합니다...',
		'소라의 표정이 살짝 밝아진다.',
		'show character s happy',
		'함께 서류를 나눠 들고 교무실로 향한다.',
		's 전학 오자마자 이런 일을 도와주시다니... 정말 착하시네요.',
		'p 아닙니다. 당연한 거죠.',
		's ...고마워요. 사실 저는 사람들에게 부탁하는 게 좀 어려워서...',
		's 앞으로도 잘 부탁드려요, {{player.name}} 씨.',
		'show character s smile',
		'소라가 작게 미소 짓는다. 왠지 가슴이 따뜻해진다.',
		'hide character s with fadeOut',
		'jump LunchTime'
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
		'show character s normal at center with fadeIn',
		'p 소라 씨, 도서관으로 가죠.',
		's 네! 이쪽으로 오세요.',
		'도서관 한쪽 구석, 창가 자리에 앉는다.',
		's 여기 제가 좋아하는 자리예요. 조용하고, 햇살이 잘 들어서...',
		'p 정말 좋은 자리네요.',
		's 사실... 이 자리에 다른 사람을 데려온 건 처음이에요.',
		'show character s smile',
		'소라가 얼굴을 살짝 붉히며 말한다.',
		's {{player.name}} 씨는... 왠지 편안해요.',
		'p ...소라의 이런 모습은 처음 보네. 귀엽다.',
		'창밖으로 벚꽃잎이 흩날린다. 평화로운 점심시간.',
		'hide character s with fadeOut',
		'jump Day1Afternoon'
	]
});
