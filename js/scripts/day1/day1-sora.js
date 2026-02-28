/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 1 — 소라 루트 (서류 돕기, 도서관)
 *  파일: day1-sora.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - HelpSora : 소라 서류 돕기 (sora +2)
 *    - Library  : 도서관 점심 (sora +1)
 *
 *  흐름:
 *    MorningEvent [cross-file] → HelpSora → LunchTime [cross-file]
 *    LunchTimeChoice [cross-file] → Library → Day1Afternoon [cross-file]
 *
 *  의존:
 *    - AffinityHint.show()  (affinity-hint.js)
 *    - storage: sora_affection, helped_sora, chose_library
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  HelpSora — 소라 서류 돕기 (sora +2)
	// ──────────────────────────────────
	'HelpSora': [
		'hide character h with fadeOut',
		'hide character p',
		'show scene classroom4_morning with fadeIn',
		function () {
			this.storage ({
				sora_affection: this.storage ('sora_affection') + 2,
				helped_sora: true
			});
			AffinityHint.show ('sora');
		},
		'show character s normal at center with fadeIn',
		'show character p smile at right with fadeIn',
		'p 소라 씨, 제가 도와드릴게요.',
		's 정말요? 감사합니다...',
		'소라가 잠깐 멈춘다. 말의 의미를 천천히 받아들이는 것 같다.',
		'wait 600',
		'소라의 표정이 살짝 밝아진다.',
		'show character s happy',
		'함께 서류를 나눠 들고 교무실로 향한다.',
		's 전학 오자마자 이런 일을 도와주시다니... 정말 착하시네요.',
		'p 아닙니다. 당연한 거죠.',
		's ...고마워요. 사실 저는 사람들에게 부탁하는 게 좀 어려워서...',
		's 앞으로도 잘 부탁드려요, {{player.name}} 씨.',
		'show character s happy',
		'소라가 작게 미소 짓는다. 왠지 가슴이 따뜻해진다.',
		'hide character p with fadeOut',
		'hide character s with fadeOut',
		'jump LunchTime'
	],

	// ──────────────────────────────────
	//  Library — 도서관 점심 (sora +1)
	// ──────────────────────────────────
	'Library': [
		'show scene classroom3_morning with slideLeft',
		function () {
			this.storage ({
				sora_affection: this.storage ('sora_affection') + 1,
				chose_library: true
			});
			AffinityHint.show ('sora');
		},
		'show character s normal at center with fadeIn',
		'show character p smile at right with fadeIn',
		'p 소라 씨, 도서관으로 가죠.',
		's 네! 이쪽으로 오세요.',
		'도서관 한쪽 구석, 창가 자리에 앉는다.',
		'먼지가 햇살 속에서 춤추듯 흩날린다. 오래된 책 냄새가 마음을 차분하게 한다.',
		'조용하지만 외롭지 않은── 소라 같은 공간이다.',
		's 여기 제가 좋아하는 자리예요. 조용하고, 햇살이 잘 들어서...',
		'p 정말 좋은 자리네요.',
		's 사실... 이 자리에 다른 사람을 데려온 건 처음이에요.',
		'show character s happy',
		'소라가 얼굴을 살짝 붉히며 말한다.',
		's {{player.name}} 씨는... 왠지 편안해요.',
		'p ...소라의 이런 모습은 처음 보네. 귀엽다.',
		'창밖으로 벚꽃잎이 흩날린다. 평화로운 점심시간.',
		'hide character p with fadeOut',
		'hide character s with fadeOut',
		'jump Day1Afternoon'
	]
});
