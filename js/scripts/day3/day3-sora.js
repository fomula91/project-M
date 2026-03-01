/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 3 — 소라 루트 (축제 데이트, 고백, 친구 엔딩)
 *  파일: day3-sora.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day3SoraRoute  : 소라와 축제 (sora +1)
 *    - Day3SoraClimax : 석양 고백 이벤트
 *    - SoraConfess    : 소라 엔딩 (sora +2) → end
 *    - SoraFriendEnd  : 친구 엔딩 → Day4Start
 *
 *  흐름:
 *    Day3MainBranch [cross-file] → Day3SoraRoute → Day3SoraClimax
 *    → SoraConfess (end) / SoraFriendEnd → Day4Start [cross-file]
 *
 *  의존:
 *    - fadeJump()            (helpers/transitions.js)
 *    - AffinityHint.show()  (affinity-hint.js)
 *    - storage: sora_affection, confessed, day3_ending_type
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Day3SoraRoute — 소라와 축제 (sora +1)
	// ──────────────────────────────────
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
		'바깥 축제의 소음이 멀게만 느껴진다. 그림 속 벚꽃이 진짜처럼 흩날리는 것 같다.',
		'이 공간만 따로 시간이 멈춘 것 같은 고요함.',
		's ...이 그림, 예쁘지 않아요?',
		'소라가 벚꽃 풍경화 앞에 멈춰 선다.',
		// [CG] sora-exhibition — 조용한 전시실, 벚꽃 그림 앞의 소라
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'show scene sora-exhibition_cg with fadeIn',
		'wait 3000',
		{'Function': {
			'Apply': function () { monogatari.distractionFree();},
			'Revert': function () { monogatari.distractionFree();}
		}},
		'gallery unlock sora-exhibition',
		'show scene classroom3_afternoon with fadeIn',
		'show character s normal at center with fadeIn',
		'show character p smile at right with fadeIn',
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

	// ──────────────────────────────────
	//  Day3SoraClimax — 석양 고백 이벤트
	// ──────────────────────────────────
	'Day3SoraClimax': [
		'show scene school_grounds_evening with fadeIn',
		'stop music',
		'play music sora-ending loop',
		'show character s normal at center with fadeIn',
		'축제가 끝나고, 석양이 학교를 물들인다.',
		'play sound footsteps loop',
		'소라와 함께 교정을 걷는다.',
		's {{player.name}} 씨... 저, 할 말이 있어요.',
		'소라가 벚꽃 나무 아래에서 발을 멈춘다.',
		'show character s worried',
		'stop sound footsteps',
		's 저는 원래... 사람과 가까워지는 게 무서웠어요.',
		's 혼자가 편하다고 생각했어요. 그게 저를 지키는 방법이라고...',
		's 그런데 {{player.name}} 씨를 만나고... 달라졌어요.',
		's 처음으로... 누군가의 옆에 있고 싶다고 느꼈어요.',
		'소라의 눈에 석양빛이 반사된다.',
		'혼자이던 소라가 마음을 열고 있다── 그 사실이 가슴을 뜨겁게 한다.',
		'심장이 크게 뛴다. 한 번, 두 번.',
		'show character p normal at right with fadeIn',
		'p ...도망치지 않을 거야. 소라 씨의 용기에 제대로 응답해야 해.',
		'wait 800',
		makeChoice('p 소라 씨...', {
			Confess: ['나도 같은 마음이에요.', 'SoraConfess'],
			Gentle: ['앞으로도 좋은 친구로 지내요.', 'SoraFriendEnd']
		})
	],

	// ──────────────────────────────────
	//  SoraConfess — 소라 엔딩 (sora +2)
	// ──────────────────────────────────
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

	// ──────────────────────────────────
	//  SoraFriendEnd — 친구 엔딩 → Day4Start
	// ──────────────────────────────────
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
		'centered ── 소라: 소중한 거리 ──',
		'하지만... 이것으로 끝이 아닌 것 같다.',
		'stop music',
		function () {
			this.storage({ day3_ending_type: 'sora_friend' });
		},
		...fadeJump('Day4Start'),
	]
});
