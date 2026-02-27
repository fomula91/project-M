/* global monogatari */

// Define the messages used in the game.
monogatari.action ('message').messages ({

});

// Define the notifications used in the game
monogatari.action ('notification').notifications ({

});

// Define the Particles JS Configurations used in the game
monogatari.action ('particles').particles ({

});

// Define the canvas objects used in the game
monogatari.action ('canvas').objects ({

});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration ('credits', {

});

// Define the images that will be available on your game's image gallery
monogatari.assets ('gallery', {
	'opening-unknown': 'opening.png',
});

// Define the music used in the game.
monogatari.assets ('music', {
	'acoustic-chill': 'acoustic-chill.mp3',
	'sunny-day': 'sunny-day.mp3',
	'sora-ending': 'sora-ending.mp3',
	'hana-ending': 'hana-ending.mp3',
	'harem-ending': 'harem-ending.mp3'
});

// Define the voice files used in the game.
monogatari.assets ('voices', {

});

// Define the sounds used in the game.
monogatari.assets ('sounds', {

});

// Define the videos used in the game.
monogatari.assets ('videos', {

});

// Define the images used in the game.
monogatari.assets ('images', {

});

// Define the backgrounds for each scene.
monogatari.assets ('scenes', {
	'opening_cg': 'opening.png',
	'school_front_early': 'early01.jpg',
	'school_front_day': 'day01.jpg',
	'school_grounds_early': 'early02.jpg',
	'school_grounds_day': 'day02.jpg',
	'school_grounds_evening': 'evening02.jpg',
	'classroom_day': 'classroom_01_day.jpg',
	'classroom_afternoon': 'classroom_01_afternoon.jpg',
	'classroom2_morning': 'classroom_02_morning.jpg',
	'classroom2_evening': 'classroom_02_evening.jpg',
	'classroom3_morning': 'classroom_03_morning.jpg',
	'classroom3_afternoon': 'classroom_03_afternoon.jpg',
	'classroom4_morning': 'classroom_04_morning.jpg',
	'auditorium_sunrise': 'Auditorium_Outside_Sunrise.jpg',
	'auditorium_day': 'Auditorium_Outside_Day.jpg',
	'auditorium_noon': 'Auditorium_Outside_Noon.jpg',
	'auditorium_afternoon': 'Auditorium_Outside_Afternoon.jpg',
	'auditorium_evening': 'Auditorium_Outside_Evening.jpg',
	'busstop_evening': 'bus stop evening.jpg',
	'busstop_night': 'bus stop night.jpg'
});

// Define the Characters
monogatari.characters ({
	'p': {
		name: '{{player.name}}',
		color: '#ffa726',
		directory: 'haru',
		sprites: {
			normal: 'haru_A100.png',
			smile: 'haru_A101.png',
			angry: 'haru_A102.png',
			surprised: 'haru_A104.png',
			worried: 'haru_A103.png'
		}
	},
	's': {
		name: '소라',
		color: '#4a90d9',
		directory: 'sora',
		sprites: {
			normal: 'sora_A100.png',
			happy: 'sora_A101.png',
			angry: 'sora_A102.png',
			surprised: 'sora_A104.png',
			worried: 'sora_A103.png',
			angry2: 'sora_A190.png'
		}
	},
	'h': {
		name: '하나',
		color: '#e87ba1',
		directory: 'hana',
		sprites: {
			normal: 'hana_A100.png',
			happy: 'hana_A201.png',
			normal2: 'hana_A200.png',
			laugh: 'hana_A201.png',
			angry: 'hana_A202.png',
			worried: 'hana_A203.png',
			surprised: 'hana_A204.png',
			yandere: 'hana_B199.png'
		}
	},
	'u': {
		name: "???",
		color: '#000000',
		directory: 'unknown',
		sprites: {
			normal: 'unknown_A100.png',

	}}
});