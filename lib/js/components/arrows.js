import { default as Image } from './image.js';

export default function Arrows({ arrows }) {
	let arrow_arr = [];

	arrows.split('').forEach((letter) => {
		switch (letter) {
			case 'U':
				arrow_arr.push(
					Image({ URL: './lib/icons/Arrows/complete/up-arrow.svg' }),
				);
				break;
			case 'D':
				arrow_arr.push(
					Image({
						URL: './lib/icons/Arrows/complete/down-arrow.svg',
					}),
				);
				break;
			case 'L':
				arrow_arr.push(
					Image({
						URL: './lib/icons/Arrows/complete/left-arrow.svg',
					}),
				);
				break;
			case 'R':
				arrow_arr.push(
					Image({
						URL: './lib/icons/Arrows/complete/right-arrow.svg',
					}),
				);
				break;
			default:
				arrow_arr.push(Image({ URL: 'fallback.svg' }));
		}
	});

	return arrow_arr;
}
