/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 2 — 소라 루트 (축제 준비, 석양 이벤트)
 *  파일: day2-sora.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day2WithSora    : 소라와 축제 준비 (sora +2)
 *    - Day2SoraEvening : 소라 석양 이벤트
 *
 *  흐름:
 *    Day2Morning [cross-file] → Day2WithSora → Day2Evening [cross-file]
 *    Day2Evening [cross-file] → Day2SoraEvening → Day2End [cross-file]
 *
 *  의존:
 *    - AffinityHint.show()  (affinity-hint.js)
 *    - storage: sora_affection, hana_affection, day2_studied_together
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Day2WithSora — 소라와 축제 준비 (sora +2)
	// ──────────────────────────────────
	'Day2WithSora': [
		'show scene classroom_day with fadeIn',
		function () {
			this.storage ({
				sora_affection: this.storage ('sora_affection') + 2,
				hana_affection: this.storage ('hana_affection') + 1,
				day2_studied_together: true
			});
			AffinityHint.show ('sora');
		},
		'show character s surprised at center with fadeIn',
		'show character p smile at left with fadeIn',
		'p 소라 씨, 같이 하죠.',
		's ...! 네, 감사합니다.',
		'소라의 눈이 반짝인다. 처음 보는 표정이다.',
		'show character h worried at right with fadeIn',
		'h 에에~ 아쉽다... 그럼 나는 다른 친구한테 가볼게!',
		'하나가 아쉬운 표정을 지으며 웃는다.',
		'h 아, 잠깐! 이거 아까 매점에서 산 간식인데, 둘이서 힘내라고!',
		'하나가 과자 봉지를 책상 위에 올려놓고 환하게 웃는다.',
		'h 열심히 해~ 응원할게!',
		'hide character h with fadeOut',
		'방과 후, 교실에서 둘이서 축제 준비를 시작한다.',
		's 저는... 장식을 만드는 건 자신 있어요.',
		's 이 종이학을 봐주세요. 이런 식으로 장식하면 어떨까요?',
		'소라가 정성스럽게 접은 종이학을 보여준다.',
		'show character s happy',
		'p 와, 정말 예쁘다. 소라 씨 손재주가 대단하네요.',
		's 에... 칭찬은 좀 부끄럽지만... 고마워요.',
		'show character s happy',
		'소라가 얼굴을 붉히며 작은 종이학 하나를 건넨다.',
		's 이건... {{player.name}} 씨에게 드리는 거예요. 행운의 부적이라고 생각해주세요.',
		'p 소중하게 간직할게요.',
		'손바닥 위의 종이학이 의외로 따뜻하다. 소라의 체온이 남아 있는 것 같다.',
		'소라가 수줍게 미소 짓는다. 심장이 두근거린다.',
		'hide character p with fadeOut',
		'hide character s with fadeOut',
		'jump Day2Evening'
	],

	// ──────────────────────────────────
	//  Day2SoraEvening — 소라 석양 이벤트
	// ──────────────────────────────────
	'Day2SoraEvening': [
		'show scene classroom2_evening with fadeIn',
		'show character s normal at center with fadeIn',
		'복도에서 소라를 마주친다. 소라가 창밖을 바라보고 있다.',
		's ...아, {{player.name}} 씨.',
		'show character p normal at right with fadeIn',
		'p 아직 안 갔어요?',
		's 네... 석양이 예뻐서 잠깐 보고 있었어요.',
		's {{player.name}} 씨는... 석양 좋아하세요?',
		'p 네, 좋아해요.',
		's ...저도요. 특히 이 학교에서 보는 석양은 특별해요.',
		's 내일이... 기대돼요. {{player.name}} 씨와 함께니까.',
		'show character s happy',
		'소라가 처음으로 환하게 웃는다.',
		'p ...저도요, 소라 씨.',
		'두 사람 사이로 석양빛이 부드럽게 비춘다.',
		'hide character p with fadeOut',
		'hide character s with fadeOut',
		'jump Day2End'
	]
});
