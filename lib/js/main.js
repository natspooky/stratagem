import SimpleCanvas from './SimpleCanvas_0.0.1v_branch.js';
import * as ENCORE_SEC from './ENCORE_SEC_1.0.7v_branch.js';
import { STRATAGEM_LIST } from './STRATAGEM_DATA.js';

let canvas,
	context,
	arrowBuffer = [
		{
			isActive: false,
			direction: 'UP',
		},
	],
	activeIndex = 0,
	canvasCenter = {
		x: 0,
		y: 0,
	};

function setup() {
	canvasCenter = {
		x: canvas.canvasSize.x / 2,
		y: canvas.canvasSize.y / 2,
	};
	console.log(canvasCenter);
}

function resize() {
	canvasCenter = {
		x: canvas.canvasSize.x / 2,
		y: canvas.canvasSize.y / 2,
	};
}

function draw() {
	canvas.paint('black');
	let arrowCount = arrowBuffer.length;

	arrowBuffer.forEach((arrow, index) => {});

	/// use SC for visuals only and not input as i havent finished the input part of the app yet
}

function decoder(inputString) {
	let array = [];
	inputString.forEach((letter) => {
		let inputFunction, arrowID;
		switch (letter) {
			case 'U':
				inputFunction = awaitUp;
				arrowID = 'UP';
				break;
			case 'D':
				inputFunction = awaitDown;
				arrowID = 'DOWN';
				break;
			case 'L':
				inputFunction = awaitLeft;
				arrowID = 'LEFT';
				break;
			case 'R':
				inputFunction = awaitRight;
				arrowID = 'RIGHT';
				break;
		}
		array.push([inputFunction, arrowID]);
	});
	return 'decoded!';
}

function createBuffer(arr) {
	arrowBuffer = [];
	activeIndex = 0;

	arr.forEach((arrowData) => {
		arrowBuffer.push({
			state: 'ACTIVE,COMPLETE,AWAITING',
			arrowID: arrowData[1],
		});
	});
}

function drawArrow(index, count) {}

function direction(event) {
	return;
}

function awaitUp() {}

function awaitDown() {}

function awaitLeft() {}

function awaitRight() {}

function load() {
	canvas = new SimpleCanvas('StratTouchPanel', {
		fps: 30,
		autoClear: true,
		calculateFPS: true,
		showLayerPosition: true,
		calculateOverlay: true,
		useCursor: false,
		useKeyboard: false,
		useScroll: false,
		useTouch: false,
		detectWindowFocus: false,
	});
	context = canvas.context;

	canvas.setup(setup);
	canvas.resize(resize);
	canvas.draw(draw);

	document.body.classList.add('loaded');

	setTimeout(() => {
		document.body.classList.add('ready');
	}, 3000);
}

function generateTile() {}

window.addEventListener('load', load);
