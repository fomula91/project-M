/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 5 — Together 루트 (유우 편지, 트루 엔딩)
 *  파일: day5-together.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day5TogetherRoute  : 5일차 시작 → 편지
 *    - Day5TogetherLetter : 유우 편지 + 트루 엔딩 → end
 *
 *  흐름:
 *    Day4Evening [cross-file] → Day5TogetherRoute → Day5TogetherLetter (end)
 *
 *  의존:
 *    - storage: (없음)
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Day5TogetherRoute — 5일차 시작
	// ──────────────────────────────────
	'Day5TogetherRoute': [
		'show scene school_front_early with fadeFromBlack duration 1500',
		'centered ── 5일차: 이어지는 봄 ──',
		'show scene school_grounds_day with fadeIn',
		'유우 선배의 말이 머릿속에서 맴돈다.',
		'"서두르지 마. 하지만 도망치지도 마."',
		'show character p normal at center with fadeIn',
		'p ...소라도, 하나도, 둘 다 놓치고 싶지 않아.',
		'p 그건 욕심이 아니야. 그냥... 솔직한 마음이야.',
		'hide character p with fadeOut',
		'방과후──',
		'jump Day5TogetherLetter'
	],

	// ──────────────────────────────────
	//  Day5TogetherLetter — 유우 편지 + 트루 엔딩
	// ──────────────────────────────────
	'Day5TogetherLetter': [
		'show scene auditorium_sunrise with fadeIn',
		'stop music fade 2',
		'play music harem-ending loop fade 2',
		'강당 앞에서 소라와 하나가 기다리고 있다.',
		'show character s normal at left with fadeIn',
		'show character h happy at right with fadeIn',
		'h {{player.name}}! 이거 봐! 유우 선배가 편지를 남겼대!',
		'show character s happy',
		's 우리 사물함에 하나씩 들어있었어요.',
		'show character p normal at center with fadeIn',
		'p 나한테도 왔어. 같이 읽어볼까?',
		'셋이서 강당 계단에 나란히 앉아 편지를 펼친다.',
		'hide character s',
		'hide character h',
		'hide character p',
		'"──소라, 하나, 그리고 하루에게."',
		'"너희 셋을 보면서 안심했어."',
		'"소라는 더 이상 혼자가 아니고, 하나는 진짜 웃음을 찾았고,"',
		'"하루는 두 사람 사이에서 제 역할을 잘 해주고 있더라."',
		'"내가 졸업하면서 걱정했던 게 하나 있었거든."',
		'"소라와 하나가 다시 외로워지지 않을까."',
		'"하지만 이제 안심이야. 하루가 있으니까."',
		'"셋이서 함께라면 어떤 계절이 와도 괜찮을 거야."',
		'"──봄은 끝나지 않아. 너희가 함께라면."',
		'"유우 올림."',
		'show character s happy at left with fadeIn',
		'show character h laugh at right with fadeIn',
		'show character p smile at center with fadeIn',
		'소라의 눈에 눈물이 맺힌다.',
		's 유우 선배... 고마워요.',
		'하나가 코를 훌쩍인다.',
		'h 아~ 선배 때문에 울잖아!',
		'p 하하... 나도 좀 울 것 같아.',
		's {{player.name}} 씨, 하나... 우리 앞으로도 함께해요.',
		'h 당연하지! 우리 셋은 평생 같이야!',
		'p ...그래. 우리 셋이서, 이 봄을 이어가자.',
		'벚꽃잎이 강당 앞에 흩날리며 세 사람을 감싼다.',
		'졸업한 선배의 마음이, 세 사람의 우정이, 봄바람에 실려 퍼져나간다.',
		'이 봄은 끝나지 않는다.',
		'셋이 함께라면──',
		'hide character s with fadeOut',
		'hide character h with fadeOut',
		'hide character p with fadeOut',
		'show scene auditorium_sunrise with fadeIn',
		'centered ── 트루 엔딩: 이어지는 봄 ──',
		'end'
	]
});
