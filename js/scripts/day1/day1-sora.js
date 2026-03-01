/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 1 — 소라 루트 (서류 돕기, 휴게 라운지)
 *  파일: day1-sora.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - HelpSora : 소라 서류 돕기 (sora +2)
 *    - Library  : 휴게 라운지 점심 (sora +1)
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
		'hide character p with fadeOut',
		'show scene classroom4_morning with fadeIn',
		function () {
			this.storage ({
				sora_affection: this.storage ('sora_affection') + 2,
				helped_sora: true
			});
			AffinityHint.show ('sora');
		},
		'show character s worried at center with fadeIn',
		'소라가 서류를 잔뜩 안고 있다. 분명 힘겨워 보이는데, 주변에 도움을 청하지 못하고 있다.',
		'show character p normal at right with fadeIn',
		'p 소라 씨, 많은데── 좀 들어줄까요?',
		's 아... 저, 괜찮아요. 혼자 할 수 있──',
		'서류가 기울어진다. 소라가 황급히 바로잡는다.',
		'p ...괜찮지 않아 보이는데요.',
		'show character s surprised',
		'wait 600',
		's ............감사합니다.',
		'소라가 작게 고개를 숙이며 서류 절반을 건넨다.',
		'show character s normal',
		'play sound footsteps loop',
		'함께 서류를 나눠 들고 교무실로 향한다.',
		'stop sound footsteps fade 1',
		's ...사실, 부탁하는 게 잘 안 돼서요.',
		'show character s happy',
		's 도와주셔서 고마워요, {{player.name}} 씨.',
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
		'p 소라 씨, 같이 점심 먹으러 가죠.',
		's 혹시 조용한 데서 쉬고 싶으시면... 도서관 옆에 사람이 잘 안 오는 자리가 있어요.',
		'도서관 옆 작은 휴게 라운지. 창가 자리에 앉는다.',
		'먼지가 햇살 속에서 춤추듯 흩날린다. 오래된 책 냄새가 마음을 차분하게 한다.',
		'조용하지만 외롭지 않은── 소라 같은 공간이다.',
		's 여기... 조용하고, 햇살이 잘 들어서 좋아요.',
		'p 정말 좋은 자리네요.',
		's 여기는 보통 사람이 잘 안 와서... 저도 자주 오는 건 아니지만.',
		'show character s happy',
		'소라가 작게 웃으며 말한다.',
		's ...왠지 긴장이 덜 되네요.',
		// TODO: [CG] library-sora — 도서관 창가, 햇살 속 소라
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'show scene library-sora_cg with fadeIn',
		'wait 3000',
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'gallery unlock library-sora',
		'show scene classroom3_morning with fadeIn',
		'show character p smile at right with fadeIn',
		'p ...소라의 이런 모습은 처음 보네.',
		'창밖으로 벚꽃잎이 흩날린다. 평화로운 점심시간.',
		'jump Day1Afternoon'
	]
});
