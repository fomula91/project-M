/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 2 — 하나 루트 (축제 준비, 석양 이벤트)
 *  파일: day2-hana.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day2WithHana    : 하나와 축제 준비 (hana +2)
 *    - Day2HanaEvening : 하나 석양 이벤트
 *
 *  흐름:
 *    Day2Morning [cross-file] → Day2WithHana → Day2Evening [cross-file]
 *    Day2Evening [cross-file] → Day2HanaEvening → Day2End [cross-file]
 *
 *  의존:
 *    - AffinityHint.show()  (affinity-hint.js)
 *    - storage: hana_affection, sora_affection
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Day2WithHana — 하나와 축제 준비 (hana +2)
	// ──────────────────────────────────
	'Day2WithHana': [
		'hide character p',
		'show scene classroom_day with slideRight',
		function () {
			this.storage ({
				hana_affection: this.storage ('hana_affection') + 2,
				sora_affection: this.storage ('sora_affection') + 1
			});
			AffinityHint.show ('hana');
		},
		'show character h laugh at center with fadeIn',
		'show character p smile at right with fadeIn',
		'p 하나, 같이 하자!',
		'h 진짜?! 최고! 우리 팀 무적이다!',
		'하나가 기뻐하며 껑충 뛰어오른다.',
		'show character s normal at left with fadeIn',
		's 그렇군요... 열심히 해주세요.',
		's 아, 이건 제가 정리해둔 축제 자료예요. 도움이 될 거예요.',
		'소라가 깔끔하게 정리된 노트를 건네준다.',
		's 두 분 다 화이팅이에요.',
		'소라가 조용히 미소를 지으며 돌아선다.',
		'hide character s with fadeOut',
		'방과 후, 하나와 함께 교실을 꾸미기 시작한다.',
		'h 여기에 풍선 달고, 저기에 리본도 달자!',
		'h {{player.name}}, 이 왕관 써봐! 내가 만든 거야!',
		'종이로 만든 왕관을 머리에 씌워주는 하나.',
		'p 하하, 이게 뭐야?',
		'h 에헤~ 축제의 왕자님! 어울린다~',
		'show character h normal2',
		'h 사실 나, 오늘 정말 즐거워. {{player.name}}랑 같이라서 그런 것 같아.',
		'하나가 갑자기 진지한 표정을 짓는다.',
		'h ...내일 축제 때도 같이 다니자. 약속!',
		'p 약속할게.',
		'show character h happy',
		'하나의 눈이 별처럼 빛난다.',
		'hide character p with fadeOut',
		'hide character h with fadeOut',
		'jump Day2Evening'
	],

	// ──────────────────────────────────
	//  Day2HanaEvening — 하나 석양 이벤트
	// ──────────────────────────────────
	'Day2HanaEvening': [
		'show scene school_grounds_evening with fadeIn',
		'show character h happy at center with fadeIn',
		'교문 앞에서 하나가 기다리고 있다.',
		'h {{player.name}}! 여기여기!',
		'show character p normal at right with fadeIn',
		'p 하나? 기다리고 있었어?',
		'h 응! 같이 가고 싶어서~',
		'하나와 나란히 걷기 시작한다.',
		'h 있잖아, {{player.name}}...',
		'h 나, 오늘 정말 행복했어.',
		'p 나도 즐거웠어.',
		'show character h normal',
		'h 에헤... 그 말 듣으니까 더 행복해진다.',
		'하나가 살짝 얼굴을 붉히며 하늘을 올려다본다.',
		'h 내일... 꼭 같이 축제 돌아다니자. 절대 약속!',
		'p 응, 약속.',
		'석양 속 하나의 미소가 유독 아름답게 보인다.',
		'hide character p with fadeOut',
		'hide character h with fadeOut',
		'jump Day2End'
	]
});
