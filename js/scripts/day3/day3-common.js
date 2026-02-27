/* global monogatari */
/**
 * ═══════════════════════════════════════════
 *  Day 3 — 공통 (축제 시작, 사진 발견, 메인 분기)
 *  파일: day3-common.js
 * ═══════════════════════════════════════════
 *
 *  라벨 목록:
 *    - Day3Start          : 축제 당일 아침
 *    - Day3PhotoDiscovery : 사진 복선 (unknown_interest ≥ 1)
 *    - Day3MainBranch     : 호감도 기반 메인 분기
 *    - Day3BothHigh       : 양쪽 호감 높음 → 3자 선택
 *    - Day3Balanced       : 호감 균형 → Together 루트
 *
 *  흐름:
 *    Day2End [cross-file] → Day3Start → (Photo) → Day3MainBranch
 *    → Day3SoraRoute / Day3HanaRoute / Day3TogetherRoute [cross-file]
 *
 *  의존:
 *    - AffinityHint.show()  (affinity-hint.js)
 *    - storage: unknown_interest, sora_affection, hana_affection
 * ═══════════════════════════════════════════
 */

monogatari.script ({

	// ──────────────────────────────────
	//  Day3Start — 축제 당일 아침
	// ──────────────────────────────────
	'Day3Start': [
		'show scene school_grounds_early with fadeIn',
		'centered ── 3일차: 축제, 그리고... ──',
		'show scene auditorium_day with fadeIn',
		'축제 당일 아침.',
		'학교 전체가 활기로 가득하다. 풍선, 리본, 현수막이 곳곳에 걸려 있다.',
		'show character p normal at center with fadeIn',
		'p 드디어 축제다...',
		'hide character p with fadeOut',
		{
			'Conditional': {
				'Condition': function () {
					return this.storage('unknown_interest') >= 1 ? 'PhotoEvent' : 'SkipPhoto';
				},
				'PhotoEvent': 'jump Day3PhotoDiscovery',
				'SkipPhoto': 'jump Day3MainBranch'
			}
		}
	],

	// ──────────────────────────────────
	//  Day3PhotoDiscovery — 사진 복선
	// ──────────────────────────────────
	'Day3PhotoDiscovery': [
		'show scene auditorium_day with fadeIn',
		'축제 게시판 앞을 지나가는데, 오래된 사진 한 장이 눈에 들어온다.',
		'show character p surprised at center with fadeIn',
		'p ...이건──?',
		'사진 속에는 소라, 하나, 그리고 낯선 학생 한 명이 웃고 있다.',
		'p 이 사람... 어딘가에서 본 것 같은데.',
		'p 정류장에서 본 사람과 닮은 것 같기도 하고...',
		'hide character p with fadeOut',
		function () {
			this.storage({ unknown_interest: this.storage('unknown_interest') + 1 });
			AffinityHint.show('unknown');
		},
		'jump Day3MainBranch'
	],

	// ──────────────────────────────────
	//  Day3MainBranch — 호감도 기반 메인 분기
	// ──────────────────────────────────
	'Day3MainBranch': [
		'show scene auditorium_day with fadeIn',
		{
			'Conditional': {
				'Condition': function () {
					var sora = this.storage ('sora_affection');
					var hana = this.storage ('hana_affection');
					if (sora >= 4 && hana >= 4) {
						return 'BothHigh';
					} else if (sora > hana) {
						return 'SoraHigh';
					} else if (hana > sora) {
						return 'HanaHigh';
					} else {
						return 'Balanced';
					}
				},
				'BothHigh': 'jump Day3BothHigh',
				'SoraHigh': 'jump Day3SoraRoute',
				'HanaHigh': 'jump Day3HanaRoute',
				'Balanced': 'jump Day3Balanced'
			}
		}
	],

	// ──────────────────────────────────
	//  Day3BothHigh — 양쪽 호감 높음 → 3자 선택
	// ──────────────────────────────────
	'Day3BothHigh': [
		'show scene classroom4_morning with slideRight',
		'교실에 들어서자 소라와 하나가 동시에 다가온다.',
		'show character s worried at left with fadeIn',
		'show character h surprised at right with fadeIn',
		's {{player.name}} 씨, 오늘 축제... 같이 돌아볼래요?',
		'h {{player.name}}! 나랑 같이 돌아다니기로 했잖아!',
		's ...에? 하나 씨, 저도 {{player.name}} 씨와 약속이...',
		'h 에에?! 소라도?!',
		'두 사람이 서로를 바라보며 당혹스러운 표정을 짓는다.',
		'show character p worried at center with fadeIn',
		'p ...이건 어떻게 해야 하지.',
		{
			'Choice': {
				'Dialog': 'p ...어떻게 하면 좋을까?',
				'ChooseSora': {
					'Text': '소라와 함께 축제를 돌아본다',
					'Do': 'jump Day3SoraRoute'
				},
				'ChooseHana': {
					'Text': '하나와 함께 축제를 돌아본다',
					'Do': 'jump Day3HanaRoute'
				},
				'ChooseBoth': {
					'Text': '셋이서 같이 다니자!',
					'Do': 'jump Day3TogetherRoute'
				}
			}
		}
	],

	// ──────────────────────────────────
	//  Day3Balanced — 호감 균형 → Together 루트
	// ──────────────────────────────────
	'Day3Balanced': [
		'show scene classroom4_morning with fadeIn',
		'교실에 들어서자 소라와 하나가 나란히 앉아 이야기를 나누고 있다.',
		'show character s happy at left with fadeIn',
		'show character h happy at right with fadeIn',
		'h 아! {{player.name}}! 와와, 오늘 축제 같이 돌자!',
		's 네, {{player.name}} 씨도 함께해요.',
		'두 사람의 따뜻한 웃음이 나를 맞이한다.',
		'jump Day3TogetherRoute'
	]
});
