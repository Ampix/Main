import type { digitType, solverOutput } from './types.ts';

export function getPossibleDigits(grid: digitType[]) {
	const modifiedGrid = [];
	for (let i = 0; i < grid.length; i++) {
		const digit = grid[i];
		digit.posibility = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		if (digit.value !== 0) {
			for (let j = 0; j < grid.length; j++) {
				const djgjt = grid[i];
				if (
					digit.pos[0] === djgjt.pos[0] ||
					digit.pos[1] === djgjt.pos[1] ||
					digit.section === djgjt.section ||
					djgjt.value !== 0
				) {
					digit.posibility.splice(digit.posibility.indexOf(djgjt.value) - 1, 1);
				}
			}
		}
		modifiedGrid.push(digit);
	}
	return modifiedGrid;
}

function solve(grid: digitType[]): solverOutput {
	let output: solverOutput = { possibilities: 0, solved: grid };

	return output;
}

console.log(
	getPossibleDigits([
		{
			value: 1,
			pos: [0, 0],
			section: [0, 0],
			posibility: []
		},
		{
			value: 0,
			pos: [0, 1],
			section: [0, 0],
			posibility: []
		}
	])
);
