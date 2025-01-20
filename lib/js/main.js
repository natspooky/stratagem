let canvas;

function drawStrat(data) {
	console.log(data);
}

function load() {
	document.body.classList.add('loaded');
	//canvas = new ENC_canvas();

	setTimeout(() => {
		document.body.classList.add('ready');
		canvas.draw(drawStrat);
	}, 4000);
}

window.addEventListener('load', load);
