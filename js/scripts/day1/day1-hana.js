/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 1 — 하나 루트 (학교 탐험, 옥상)
 *  파일: day1-hana.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - GoWithHana : 하나와 학교 탐험 (hana +2)
 *    - Rooftop    : 옥상 점심 (hana +1)
 *
 *  흐름:
 *    MorningEvent [cross-file] → GoWithHana → LunchTime [cross-file]
 *    LunchTimeChoice [cross-file] → Rooftop → Day1Afternoon [cross-file]
 *
 *  의존:
 *    - AffinityHint.show()  (affinity-hint.js)
 *    - storage: hana_affection, helped_sora, chose_library
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  GoWithHana — 하나와 학교 탐험 (hana +2)
	// ──────────────────────────────────
	'GoWithHana': [
		'hide character s with fadeOut',
		'hide character p',
		'show scene auditorium_day with slideRight',
		function () {
			this.storage ({
				hana_affection: this.storage ('hana_affection') + 2,
				helped_sora: false
			});
			AffinityHint.show ('hana');
		},
		'show character h laugh at center with fadeIn',
		'show character p smile at left with fadeIn',
		'p 좋아, 같이 가자 하나!',
		'h 야호~! 가자가자!',
		'show character h happy',
		'하나에 이끌려 학교 곳곳을 돌아다닌다.',
		'h 여기가 매점! 그리고 저기가 체육관! 아, 그리고 옥상도 갈 수 있어!',
		'p 하하, 너 정말 활발하다.',
		'h 에헤헤~ 새 친구랑 같이 다니니까 더 신나지!',
		'h {{player.name}}는 정말 재밌는 사람이야. 우리 절친하자!',
		'하나의 밝은 에너지에 나도 모르게 웃음이 난다.',
		'문득 하나가 살짝 내 표정을 살핀다── 내가 정말 즐거운지 확인하듯이.',
		'그 찰나의 시선이 왠지 마음에 걸린다.',
		'hide character p with fadeOut',
		'hide character h with fadeOut',
		'jump LunchTime'
	],

	// ──────────────────────────────────
	//  Rooftop — 옥상 점심 (hana +1)
	// ──────────────────────────────────
	'Rooftop': [
		'hide character p',
		'show scene auditorium_noon with slideRight',
		function () {
			this.storage ({
				hana_affection: this.storage ('hana_affection') + 1,
				chose_library: false
			});
			AffinityHint.show ('hana');
		},
		'show character h happy at center with fadeIn',
		'show character p smile at left with fadeIn',
		'p 하나, 옥상으로 가자!',
		'h 좋아~! 달려!',
		'옥상에서 바라보는 풍경은 장관이다.',
		'세찬 바람이 머리카락을 흩날린다. 교정의 벚꽃이 분홍빛 융단처럼 펼쳐져 있다.',
		'높은 곳에서 보는 세상은 어딘가 자유로운 느낌이다.',
		'h 여기서 보면 벚꽃이 진짜 예쁘지? 나 이 학교에서 여기가 제일 좋아.',
		'p 와, 정말 좋은 곳이다.',
		'h 에헤~ 이건 나만 아는 비밀 장소야. {{player.name}}에게만 알려주는 거다!',
		'p 비밀 장소를 알려줘도 되는 거야?',
		'h {{player.name}}이니까 괜찮지! 우리 이제 특별한 사이잖아~',
		'show character h laugh',
		'하나가 장난스럽게 윙크한다.',
		'p ...하나는 정말 밝은 아이다. 같이 있으면 나까지 즐거워져.',
		'hide character p with fadeOut',
		'hide character h with fadeOut',
		'jump Day1Afternoon'
	]
});
