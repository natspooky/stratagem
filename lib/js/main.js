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

const STRATAGEM_LIST = {
	/*
	 * 1: orbital
	 * 2: eagle
	 * 3: support item
	 * 4: turret/ground util
	 * 5: defaults
	 * god this sucked to make
	 */
	'1:1': {
		inputString: 'RDLUU',
		inputID: 'ORBITAL GATLING BARRAGE',
	},
	'1:2': {
		inputString: 'RDRDRD',
		inputID: 'ORBITAL WALKING BARRAGE',
	},
	'1:3': {
		inputString: 'RRDLRD',
		inputID: 'ORBITAL 120MM HE BARRAGE',
	},
	'1:4': {
		inputString: 'RDUULDD',
		inputID: 'ORBITAL 380MM HE BARRAGE',
	},
	'1:5': {
		inputString: 'RRDR',
		inputID: 'ORBITAL GAS STRIKE',
	},
	'1:6': {
		inputString: 'RRLD',
		inputID: 'ORBITAL EMS STRIKE',
	},
	'1:7': {
		inputString: 'RRDU',
		inputID: 'ORBITAL SMOKE STRIKE',
	},
	'1:8': {
		inputString: 'RRR',
		inputID: 'ORBITAL AIRBURST STRIKE',
	},
	'1:9': {
		inputString: 'RRU',
		inputID: 'ORBITAL PRECISION STRIKE',
	},
	'1:10': {
		inputString: 'RUDDR',
		inputID: 'ORBITAL RAILCANNON STRIKE',
	},
	'1:11': {
		inputString: 'RDURD',
		inputID: 'ORBITAL LASER',
	},
	'2:1': {
		inputString: 'URR',
		inputID: 'EAGLE STRAFING RUN',
	},
	'2:4': {
		inputString: 'URDDD',
		inputID: '500KG BOMB',
	},
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
		fps: 60,
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
		canvas.draw(draw);
	}, 3000);
}

window.addEventListener('load', load);
