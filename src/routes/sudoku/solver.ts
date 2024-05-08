import type { digitType, solverOutput } from './types.ts';

export function getPossibleDigits(grid: digitType[]) {
	const modifiedGrid = [];
	for (let i = 0; i < grid.length; i++) {
		const digit = grid[i];
		if (digit.value === 0) {
			for (let j = 0; j < grid.length; j++) {
				const djgjt = grid[j];
				if (
					(digit.pos[0] === djgjt.pos[0] ||
						digit.pos[1] === djgjt.pos[1] ||
						digit.section === djgjt.section) &&
					djgjt.value !== 0 &&
					djgjt !== digit
				) {
					const index = digit.posibility.indexOf(djgjt.value);
					if (index !== -1) {
						digit.posibility.splice(index, 1);
					}
				}
			}
		}
		modifiedGrid.push(digit);
	}
	return modifiedGrid;
}

function solve(Igrid: digitType[]): solverOutput {
	let output: solverOutput = { solved: [], possibilities: 0 };
	output = { solved: [], possibilities: 1 };

	let grid = getPossibleDigits(Igrid);

	while (output.solved.length === 0) {
		for (let i = 0; i < grid.length; i++) {
			// const digit = grid[i];
			if (grid[i].posibility.length === 1) {
				grid[i].value = grid[i].posibility[0];
			}
			const counterPossible = [0, 0, 0, 0, 0, 0, 0, 0, 0];
			for (let j = 0; j < grid.length; j++) {
				const djgjt = grid[j];
				if (
					(grid[i].pos[0] === djgjt.pos[0] ||
						grid[i].pos[1] === djgjt.pos[1] ||
						grid[i].section === djgjt.section) &&
					djgjt !== grid[i]
				) {
					for (let i = 0; i < grid[i].posibility.length; i++) {
						const element = grid[i].posibility[i];
						if (djgjt.posibility.includes(element)) counterPossible[i]++;
					}
				}
				for (let i = 0; i < counterPossible.length; i++) {
					const element = counterPossible[i];
					if (element === 1) grid[i].value = i + 1;
				}
			}
		}
		grid = getPossibleDigits(grid);
	}

	return output;
}
