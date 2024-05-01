import type { digitType } from './types.ts';
function createMatch(difficulty: number) {
	const blankDigit: digitType = { value: 0, pos: [], section: [], posibility: [] };
	let map: digitType[] = [];

	for (let i = 0; i < 81; i++) {
		map.push(blankDigit);
	}
}
