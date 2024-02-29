import { prime_number_ } from "~/pages/matek/prime.vue";

export const useLnko = (numbers: number[]) => {
	let result: number[][] = [[], []];
	const felbontott: number[][][] = [[], []];

	for (const element of numbers) {
		const egyeske = prime_number_(element, true);
		console.log(egyeske);
		if (egyeske) {
			felbontott[0].push(egyeske.result[0]);
			felbontott[1].push(egyeske.result[1]);
		}
	}
	if (numbers.length === 1) {
		result = [felbontott[0][0], felbontott[1][0]];
		return result;
	}
	console.log("felbontott", felbontott);
	for (let j = 0; j < felbontott[0][0].length; j++) {
		const searched = felbontott[0][0][j];
		let counter = 0;
		for (let i = 0; i < felbontott[0].length; i++) {
			const element = felbontott[0][i];
			if (element.includes(searched)) {
				counter++;
			}
		}
		console.log("counter", counter);
		if (counter >= felbontott[0].length) {
			result[0].push(searched);
		}
	}

	console.log("result", result);

	if (result[0].length !== 0) {
		for (const number of result[0]) {
			let minimum = 10000000;
			for (let i = 0; i < felbontott[0].length; i++) {
				const element = felbontott[0][i];

				if (felbontott[1][i][element.indexOf(number)] < minimum) {
					minimum = felbontott[1][i][element.indexOf(number)];
				}
			}
			result[1].push(minimum);
		}
	} else {
		result = [[1], [1]];
	}
	console.log("result", numbers, result);
	return result;
};
