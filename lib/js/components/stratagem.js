import * as ENCORE_SEC from '../ENCORE_SEC_1.0.7v_branch.js';
import { default as Image } from './image.js';
import { default as Arrows } from './arrows.js';

export default function Stratagem({ URL, arrows, ID, code }) {
	const Theme = (code) => {
		switch (code.split(':')[0]) {
			case '1':
			case '2':
				return 'red';
			case '3':
				return 'blue';
			case '4':
				return 'green';
			default:
				return '';
		}
	};
	return {
		tag: 'div',
		classes: 'stratagem',
		dataset: {
			code: code,
		},
		children: [
			{
				tag: 'span',
				classes: ['stratIcon', Theme(code)],
				children: Image({ URL }),
			},
			{
				tag: 'span',
				classes: 'stratTextCont',
				children: [
					{
						tag: 'h1',
						innerHTML: ID,
					},
					{
						tag: 'span',
						classes: 'stratArrowCont',
						children: Arrows({ arrows }),
					},
				],
			},
		],
	};
}
