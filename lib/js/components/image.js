export default function Image({ URL, width, height }) {
	const loader = (self) => {
		return;
	};
	const error = (self) => {
		self.remove();
	};
	return {
		tag: 'img',
		events: {
			load: { func: loader, var: 'self' },
			error: { func: error, var: 'self' },
		},
		attributes: {
			src: URL,
			draggable: false,
			alt: 'image',
			width: width,
			height: height,
		},
	};
}
