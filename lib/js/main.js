let canvas,
	context,
	arrowBuffer = [
		{
			isActive: false,
			direction: 'UP',
		},
	];
activeIndex = 0;
canvasCenter = {
	x: 0,
	y: 0,
};

function drawStrat() {
	canvas.paint('black');
	let arrowCount = arrowBuffer.length;

	arrowBuffer.forEach((arrow) => {
		arrow.isActive;
	});

	/// use SC for visuals only and not input as i havent finished the input part of the app yet
}

function setup() {
	canvasCenter = {
		x: canvas.canvasSize.x / 2,
		y: canvas.canvasSize.y / 2,
	};
}

function resize() {
	canvasCenter = {
		x: canvas.canvasSize.x / 2,
		y: canvas.canvasSize.y / 2,
	};
}

const keyInputs = {
	'500kg': {
		inputString: 'UDLR',
		inputID: '500',
	},
};

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
			isActive: false,
			arrowID: arrowData[1],
		});
	});
}

function direction(event) {
	return;
}

function awaitUp() {}

function awaitDown() {}

function awaitLeft() {}

function awaitRight() {}

function load() {
	canvas = new SimpleCanvas('StratTouchPanel', {
		fps: 120,
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
	document.body.classList.add('loaded');

	setTimeout(() => {
		document.body.classList.add('ready');
		canvas.setup(setup);
		canvas.resize(resize);
		canvas.draw(drawStrat);
	}, 3000);
}

window.addEventListener('load', load);
