/* global monogatari */

monogatari.script ({

	// ---- DAY 2: With Sora (sora +2) ----
	'Day2WithSora': [
		'show scene #d1c4e9 with fadeIn',
		function () {
			this.storage ({
				sora_affection: this.storage ('sora_affection') + 2,
				day2_studied_together: true
			});
		},
		'p 소라 씨, 같이 하죠.',
		's ...! 네, 감사합니다.',
		'소라의 눈이 반짝인다. 처음 보는 표정이다.',
		'h 에에~ 아쉽다... 그럼 나는 다른 친구한테 가볼게!',
		'하나가 아쉬운 표정을 지으며 웃는다.',
		'방과 후, 교실에서 둘이서 축제 준비를 시작한다.',
		's 저는... 장식을 만드는 건 자신 있어요.',
		's 이 종이학을 봐주세요. 이런 식으로 장식하면 어떨까요?',
		'소라가 정성스럽게 접은 종이학을 보여준다.',
		'p 와, 정말 예쁘다. 소라 씨 손재주가 대단하네요.',
		's 에... 칭찬은 좀 부끄럽지만... 고마워요.',
		'소라가 얼굴을 붉히며 작은 종이학 하나를 건넨다.',
		's 이건... {{player.name}} 씨에게 드리는 거예요. 행운의 부적이라고 생각해주세요.',
		'p 소중하게 간직할게요.',
		'소라가 수줍게 미소 짓는다. 심장이 두근거린다.',
		'jump Day2Evening'
	],

	'Day2SoraEvening': [
		'show scene #7986cb with fadeIn',
		'복도에서 소라를 마주친다. 소라가 창밖을 바라보고 있다.',
		's ...아, {{player.name}} 씨.',
		'p 아직 안 갔어요?',
		's 네... 석양이 예뻐서 잠깐 보고 있었어요.',
		's {{player.name}} 씨는... 석양 좋아하세요?',
		'p 네, 좋아해요.',
		's ...저도요. 특히 이 학교에서 보는 석양은 특별해요.',
		's 내일이... 기대돼요. {{player.name}} 씨와 함께니까.',
		'소라가 처음으로 환하게 웃는다.',
		'p ...저도요, 소라 씨.',
		'두 사람 사이로 석양빛이 부드럽게 비춘다.',
		'jump Day2End'
	]
});
