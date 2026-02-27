/* global monogatari */

monogatari.script ({

	// ---- DAY 4 HANA AFTERNOON ----
	'Day4HanaAfternoon': [
		'show scene auditorium_afternoon with fadeIn',
		'오후, 하나를 찾아 강당 뒤편으로 간다.',
		'show character h normal2 at center with fadeIn',
		'하나가 혼자 앉아 하늘을 바라보고 있다.',
		'show character p normal at right with fadeIn',
		'p 하나, 여기 있었어?',
		'h ...아, {{player.name}}.',
		'하나가 평소와 다른, 조용한 목소리로 대답한다.',
		'h 유우 선배가 왔더라.',
		'p 응, 나도 만났어.',
		'h 그래...?',
		'show character h worried',
		'h 선배를 보니까... 좀 생각이 많아졌어.',
		'h 나, 원래... 밝은 척하는 거 잘하잖아.',
		'h 웃으면 다들 나를 좋아해줄 거라고 생각했거든.',
		'h 근데 유우 선배가 그랬어. "가면 벗어도 괜찮아" 라고.',
		'show character h normal2',
		'h {{player.name}} 앞에서는... 나도 좀 솔직해지고 싶어.',
		'h 항상 밝기만 한 건 아니야. 가끔은 힘들기도 하고.',
		'p 알아, 하나. 억지로 웃지 않아도 돼.',
		'p 울고 싶으면 울어도 돼. 내가 여기 있잖아.',
		'show character h surprised',
		'h ...{{player.name}}.',
		'show character h happy',
		'h 고마워. 진짜로.',
		'하나가 처음으로 꾸밈없는 미소를 짓는다.',
		'hide character h with fadeOut',
		'hide character p with fadeOut',
		'jump Day4Evening'
	]
});
