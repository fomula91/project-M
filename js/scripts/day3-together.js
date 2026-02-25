/* global monogatari */

monogatari.script ({

	// ---- Day 3: Together Route (friendship or hidden) ----
	'Day3TogetherRoute': [
		'hide character p',
		'show scene #fff9c4 with slideRight',
		function () {
			this.storage ({
				chose_both: true
			});
		},
		'show character s normal at left with fadeIn',
		'show character h laugh at right with fadeIn',
		'셋이서 축제를 돌아본다.',
		'h 솜사탕 사자! 셋이서 나눠 먹자!',
		'show character s surprised',
		's 에... 저는 달콤한 건 좀...',
		'h 에이~ 맛있으니까 먹어봐!',
		'소라와 하나가 티격태격하는 모습에 나도 모르게 웃음이 난다.',
		'show character p smile at center with fadeIn',
		'p 하하, 너희 둘 정말 사이좋다.',
		's 에...? 그, 그런가요?',
		'show character h happy',
		'h 어? 우리 사이 좋았어? 에헤~',
		'셋이서 점술 카페, 전시실, 매점을 돌아다닌다.',
		'정신없이 즐거운 시간이 흘러간다.',
		'jump Day3TogetherClimax'
	],

	'Day3TogetherClimax': [
		'show scene #ffab91 with fadeIn',
		'show character s happy',
		'show character h happy',
		'show character p smile at center with fadeIn',
		'축제가 끝나갈 무렵, 옥상에서 셋이 석양을 바라본다.',
		's ...오늘 정말 즐거웠어요.',
		'h 응! 최고의 축제였어!',
		'p 나도... 너희 덕분에 정말 행복했어.',
		'h {{player.name}}... 우리 앞으로도 계속 이렇게 지내자!',
		's 네... 저도 같은 마음이에요.',
		'hide character p with fadeOut',
		{	
			'Conditional': {
				'Condition': function () {
					var sora = this.storage ('sora_affection');
					var hana = this.storage ('hana_affection');
					if (sora >= 5 && hana >= 5 && this.storage ('chose_both') === true) {
						return 'HiddenPath';
					} else {
						return 'FriendPath';
					}
				},
				'HiddenPath': 'jump HiddenEnding',
				'FriendPath': 'jump FriendshipEnding'
			}
		}
	],

	// ---- HIDDEN ENDING: Sakura Promise ----
	'HiddenEnding': [
		'show scene #e1bee7 with fadeIn',
		'갑자기 바람이 불며 벚꽃잎이 옥상 위로 솟구친다.',
		'말 그대로 벚꽃 비가 내린다.',
		'show character h surprised',
		'h 와...! 진짜 예쁘다!',
		'show character s surprised',
		's 이건... 마치 마법 같아요.',
		'세 사람 모두 말을 잃고 벚꽃 비를 바라본다.',
		'show character p normal at center',
		'p ...있잖아, 둘 다.',
		's 네?',
		'h 응?',
		'p 전학 와서 불안했는데... 너희를 만나서 정말 다행이야.',
		'p 소라의 차분한 따뜻함도, 하나의 밝은 에너지도...',
		'p 둘 다 없으면 안 될 만큼 소중해.',
		'show character s happy',
		's {{player.name}} 씨...',
		'show character h laugh',
		'h {{player.name}}...',
		'소라가 내 오른손을, 하나가 왼손을 잡는다.',
		's 저도... {{player.name}} 씨와 하나를 만나서 세상이 달라졌어요.',
		'h 나도! 셋이서 함께라서 매일이 즐거워!',
		'show character p smile',
		'p 그래, 우리 셋이서... 이 봄을 함께 걸어가자.',
		'벚꽃잎이 세 사람을 감싸며 원을 그린다.',
		'마치 이 인연을 축복하듯이.',
		'hide character p with fadeOut',
		'hide character s',
		'hide character h',
		'show scene #ce93d8 with fadeIn',
		'centered ── 히든 엔딩: 벚꽃의 약속 ──',
		'end'
	],

	// ---- FRIENDSHIP ENDING ----
	'FriendshipEnding': [
		'show scene #ffe4b5 with fadeIn',
		'show character s happy',
		'show character h happy',
		'세 사람이 옥상에서 나란히 석양을 바라본다.',
		's 벌써 축제가 끝나네요...',
		'h 아쉽다~ 내일부터 다시 수업이잖아~',
		'show character p smile at center',
		'p 하하, 그래도 오늘 정말 즐거웠어.',
		's 네, 정말... 이렇게 즐거운 건 오랜만이에요.',
		'h 내일도, 모레도, 계속 이렇게 함께하자!',
		'p 물론이지.',
		'벚꽃 나무 아래, 세 사람의 웃음소리가 퍼진다.',
		'이렇게, 사쿠라 학원에서의 새로운 이야기가 시작되었다.',
		'hide character s',
		'hide character h',
		'show scene #ffe4b5 with fadeIn',
		'centered ── 우정 엔딩: 세 사람의 봄 ──',
		'end'
	]
});
