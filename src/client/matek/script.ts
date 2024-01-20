function prime_numbers(num: number): number {
	let counter = 0;
	for (let index = 2; index <= Math.sqrt(num); index++) {
		if (num % index === 0) {
			counter++;
		}
	}
	if (counter === 0) {
		return num;
	}

	return 1;
}

function check_if_one(num: number): boolean {
	return num !== 1;
}

function prime_number_(input: number): void {
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

	for (const cucc of output) {
		if (result[0].includes(cucc)) {
			const index = result[0].indexOf(cucc);
			result[1][index]++;
		} else {
			result[1].push(1);
			result[0].push(cucc);
		}
	}

	partial_result.push(1);
	output = output.filter(check_if_one);

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
}

document
	.getElementById("prime_number_form")
	?.addEventListener("submit", (e) => {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		prime_number_(Number(Object.fromEntries(data.entries()).prime));
	});
