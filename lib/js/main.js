import { default as SimpleCanvas } from './SimpleCanvas_0.0.1v_branch.js';
import * as ENCORE_SEC from './ENCORE_SEC_1.0.7v_branch.js';
import { STRATAGEM_LIST } from './STRATAGEM_DATA.js';
import { default as Stratagem } from './components/stratagem.js';

let canvas,
	context,
	arrowBuffer = [
		{
			state: 'READY',
			direction: 'up',
			code: 'U',
		},
		{
			state: 'READY',
			direction: 'down',
			code: 'D',
		},
		{
			state: 'READY',
			direction: 'up',
			code: 'U',
		},
		{
			state: 'READY',
			direction: 'up',
			code: 'U',
		},
		{
			state: 'READY',
			direction: 'up',
			code: 'U',
		},
	],
	locked = true,
	activeIndex = 0,
	canvasCenter = {
		x: 0,
		y: 0,
	},
	pushBuffer = { x: 0, y: 0 },
	arrows = {};

function keyDown() {
	switch (canvas.keyboard.current) {
		case 'ArrowUp':
		case 'w':
			pushBuffer.y = -20;
			checkSequence('U');
			break;
		case 'ArrowDown':
		case 's':
			pushBuffer.y = 20;
			checkSequence('D');
			break;
		case 'ArrowLeft':
		case 'a':
			pushBuffer.x = -20;
			checkSequence('L');
			break;
		case 'ArrowRight':
		case 'd':
			pushBuffer.x = 20;
			checkSequence('R');
			break;
		default:
			console.log(`invalid input: ${canvas.keyboard.current}`);
	}
}

function checkSequence(code) {
	if (locked) return;
	if (code === arrowBuffer[activeIndex].code) {
		arrowBuffer[activeIndex].state = 'COMPLETE';
		activeIndex++;
	} else {
		arrowBuffer.forEach((arrow) => {
			arrow.state = 'READY';
		});
		activeIndex = 0;
	}
	if (activeIndex >= arrowBuffer.length) {
		locked = true;
		activeIndex = 0;
		setTimeout(() => {
			generateBuffer();
		}, 200);
	}
}

function generateBuffer() {
	locked = false;

	arrowBuffer = [
		{
			state: 'READY',
			direction: 'up',
			code: 'U',
		},
		{
			state: 'READY',
			direction: 'down',
			code: 'D',
		},
		{
			state: 'READY',
			direction: 'up',
			code: 'U',
		},
		{
			state: 'READY',
			direction: 'up',
			code: 'U',
		},
		{
			state: 'READY',
			direction: 'up',
			code: 'U',
		},
	];
}

function setup() {
	canvasCenter = {
		x: canvas.transformSize.width / 2,
		y: canvas.transformSize.height / 2,
	};
	context = canvas.context;
	let combos = [
		['READY', 'COMPLETE'],
		['up', 'down', 'left', 'right'],
	];
	for (let i = 0; i < combos[0].length; i++) {
		for (let j = 0; j < combos[1].length; j++) {
			let img = new Image();
			img.src = `./lib/icons/Arrows/${combos[0][i].toLowerCase()}/${
				combos[1][j]
			}-arrow.svg`;
			arrows[`${combos[0][i]}${combos[1][j]}`] = img;
		}
	}
	ENCORE_SEC.jsonElementify({
		tag: 'div',
		dataset: { dataName: 'egg' },
	});

	let json = [];
	for (const [dataName, value] of Object.entries(STRATAGEM_LIST)) {
		json.push(
			Stratagem({
				URL: `./lib/icons/Stratagems/${dataName
					.split(':')
					.join('')}.svg`,
				arrows: value.inputString,
				ID: value.inputName,
				code: dataName,
			}),
		);
	}

	json.forEach((strat) => {
		document.body.appendChild(ENCORE_SEC.jsonElementify(strat));
	});
}

function resize() {
	canvasCenter = {
		x: canvas.transformSize.width / 2,
		y: canvas.transformSize.height / 2,
	};
}

function draw() {
	canvas.paint('#444'); //'#FFE710');
	animatePush();

	arrowBuffer.forEach((arrow, index, arr) => {
		let ind = index - arr.length / 2;
		if (arrowBuffer.length > 0) {
			context.drawImage(
				arrows[`${arrow.state}${arrow.direction}`],
				canvasCenter.x +
					pushBuffer.x +
					(canvas.cursorPosition.x / canvas.canvasSize.x) *
						canvas.transformAspectRatio *
						10 +
					120 * ind,
				canvasCenter.y +
					pushBuffer.y +
					(canvas.cursorPosition.y / canvas.canvasSize.y - 0.5) *
						canvas.transformAspectRatio *
						10 -
					50,
				100,
				100,
			);
		}
	});
}

function animatePush() {
	if (pushBuffer.x > 1) {
		pushBuffer.x -= 200 * canvas.renderTime;
	} else if (pushBuffer.x < -1) {
		pushBuffer.x += 200 * canvas.renderTime;
	}
	if (pushBuffer.y > 1) {
		pushBuffer.y -= 200 * canvas.renderTime;
	} else if (pushBuffer.y < -1) {
		pushBuffer.y += 200 * canvas.renderTime;
	}
}

function readyCanvas() {
	canvas.setup(setup);
	canvas.resize(resize);
	canvas.keyDown(keyDown);
	canvas.draw(draw);
	generateBuffer();
}

function load() {
	canvas = new SimpleCanvas('StratTouchPanel', {
		fps: 120,
		autoClear: true,
		calculateFPS: true,
		showLayerPosition: true,
		calculateOverlay: true,
		useCursor: true,
		useKeyboard: true,
		useScroll: false,
		useTouch: false,
		detectWindowFocus: false,
	});
	context = canvas.context;

	readyCanvas();
	document.body.classList.add('ready');
	/*
	document.body.classList.add('loaded');

	setTimeout(() => {
		document.body.classList.add('ready');
		setTimeout(() => {
			document.getElementById('loader').remove();
		}, 800);
	}, 1000);*/
}

window.addEventListener('load', load);
