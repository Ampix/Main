import { prime_numbers, check_if_one, array_in_array } from "./functions.js";

function prime_number_(input: number): void {
	const start = performance.now();
	const bal_oldal = document.getElementById("bal_oldal");
	const jobb_oldal = document.getElementById("jobb_oldal");
	const summarized = document.getElementById("summarized");

	if (input <= 1 && bal_oldal && jobb_oldal && summarized) {
		bal_oldal.innerHTML = "";
		jobb_oldal.innerHTML = "";
		summarized.innerHTML = "";
		return;
	}

	const result: number[][] = [[], []];
	let num = input;
	let prime_numbers_under_num = [];
	let output = [];
	const partial_result = [];
	let need_to = true;
	const osztók: number[] = [];
	let number_of_oszók = 1;

	if (prime_numbers(num) === num) {
		output.push(num);
		partial_result.push(num);
		need_to = false;
		osztók.push(1);
		osztók.push(num);
		number_of_oszók += 1;
	}
	if (need_to) {
		for (let index = 2; index < num / 2 + 1; index++) {
			prime_numbers_under_num.push(prime_numbers(index));
		}

		prime_numbers_under_num.push(prime_numbers(num));
		prime_numbers_under_num = prime_numbers_under_num.filter(check_if_one);

		for (let index = 0; index < prime_numbers_under_num.length; index++) {
			const element = prime_numbers_under_num[index];

			while (num % element === 0) {
				output.push(element);
				partial_result.push(num);
				num /= element;
			}
			if (num === 1) {
				break;
			}
		}
	}

	output = output.filter(check_if_one);
	for (const cucc of output) {
		if (result[0].includes(cucc)) {
			const index = result[0].indexOf(cucc);
			result[1][index]++;
		} else {
			result[1].push(1);
			result[0].push(cucc);
		}
	}

	for (const element of result[1]) {
		number_of_oszók *= element + 1;
	}
	const indexes: number[] = [];

	for (let i = 0; i < result[0].length; i++) {
		indexes.push(0);
	}
	const more_indexes: number[][] = [];
	for (let index = 0; index < number_of_oszók; index++) {
		for (let i = indexes.length - 1; indexes.length > i && i >= 0; i--) {
			console.log(indexes);

			const temp = indexes.slice(0, indexes.length);
			if (array_in_array(temp, more_indexes)) {
				more_indexes.push(temp);
			}

			if (
				i !== indexes.length - 1 &&
				indexes.slice(i + 1, indexes.length).toString() ===
					result[1].slice(i + 1, result[1].length).toString() &&
				indexes.slice(i, indexes.length).toString() !==
					result[1].slice(i, result[1].length).toString()
			) {
				indexes[i]++;
				for (let j = 0; j < indexes.length; j++) {
					if (j > i) {
						indexes[j] = 0;
					}
				}
			}

			if (i === indexes.length - 1 && indexes[i] !== result[1][i]) {
				indexes[i]++;
			}
		}
		if (indexes.toString() === result[1].toString()) {
			break;
		}
	}
	console.log(more_indexes);
	console.log(osztók);
	// console.log(result);
	partial_result.push(1);

	if (bal_oldal && jobb_oldal && summarized) {
		bal_oldal.innerHTML = "";
		jobb_oldal.innerHTML = "";
		summarized.innerHTML = "";

		for (let i = 0; i < partial_result.length; i++) {
			const element = document.createElement("h2");
			element.innerText = partial_result[i].toString();
			bal_oldal.appendChild(element);
		}

		for (let i = 0; i < output.length; i++) {
			const element = document.createElement("h2");
			element.innerText = output[i].toString();
			jobb_oldal.appendChild(element);
		}

		const cím = document.createElement("span");
		cím.classList.add("text-3xl", "font-bold");
		cím.innerHTML = `${input.toString()} =&nbsp;`;
		summarized.appendChild(cím);

		for (const element of result[0]) {
			const index = result[0].indexOf(element);

			const szám = document.createElement("span");

			szám.innerText = element.toString();
			szám.classList.add("text-3xl", "font-bold");
			summarized.appendChild(szám);

			if (result[1][index] > 1) {
				const hatvány = document.createElement("sup");
				hatvány.innerText = result[1][index].toString();
				hatvány.classList.add("text-base", "text-xl");
				szám.appendChild(hatvány);
			}

			if (result[0][index + 1]) {
				const szorzócska = document.createElement("span");
				szorzócska.innerHTML = "&#183;";
				szorzócska.classList.add("mx-4", "text-xl", "font-bold");
				summarized.appendChild(szorzócska);
			}
		}
	}
	const end = performance.now();
	console.log(`Execution time: ${end - start} ms`);
}

document
	.getElementById("prime_number_form")
	?.addEventListener("submit", (e) => {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		prime_number_(Number(Object.fromEntries(data.entries()).prime));
	});
