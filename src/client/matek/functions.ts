import { prime_number_ } from "./script.ts";

export function prime_numbers(num: number): number {
	let counter = 0;
	for (let index = 2; index <= Math.sqrt(num); index++) {
		if (num % index === 0) {
			counter++;
		}
	}
	if (counter === 0) {
		return num;
	}

	return 0;
}

export function check_if_one(num: number): boolean {
	return num !== 0;
}

export function array_in_array(
	keresendo: number[],
	benne: number[][],
): boolean {
	for (const element of benne) {
		if (element.toString() === keresendo.toString()) {
			return false;
		}
	}
	return true;
}

export function osztósítás(index: number[], result: number[]): number {
	let output = 1;
	for (let i = 0; i < index.length; i++) {
		output *= result[i] ** index[i];
	}
	return output;
}

export function quickSort(arr: number[]): number[] {
	// Base case: If the array has one or no elements, it is already sorted.
	if (arr.length <= 1) return arr;

	// Choosing the first element in the array as the pivot.
	const pivot = arr[0];
	// Creating two empty arrays to store elements less than (left) and greater than (right) the pivot.
	const left = [];
	const right = [];

	// Looping through the array, starting from the second element because the first is the pivot.
	for (let i = 1; i < arr.length; i++) {
		// If the current element is smaller than the pivot, push it to the 'left' array.
		if (arr[i] < pivot) left.push(arr[i]);
		// If the current element is greater than or equal to the pivot, push it to the 'right' array.
		else right.push(arr[i]);
	}

	// Concatenate the result of recursively sorting the 'left' array, the pivot, and then the 'right' array.
	// Spread syntax '...' is used to concatenate arrays.
	return [...quickSort(left), pivot, ...quickSort(right)];
}
export function clear(bad: boolean): void {
	const bal_oldal = document.getElementById("bal_oldal");
	const jobb_oldal = document.getElementById("jobb_oldal");
	const summarized = document.getElementById("summarized");
	const osztócím = document.getElementById("osztó");
	const osztók_div = document.getElementById("osztók");
	const form = document.getElementById("prime_number_form");
	const oszlopok = document.getElementById("oszlopok");

	if (
		bal_oldal &&
		jobb_oldal &&
		summarized &&
		osztócím &&
		osztók_div &&
		oszlopok
	) {
		bal_oldal.innerHTML = "";
		jobb_oldal.innerHTML = "";
		summarized.innerHTML = "";
		osztók_div.innerHTML = "";
		osztócím.innerHTML = "";

		oszlopok.classList.remove("hidden");
		if (bad) {
			oszlopok.classList.add("hidden");
			(form as HTMLFormElement)?.reset();
		}
	}
}

function compareArrays(arrays: number[][], other: number[][]): number[] {
	const output: number[][] = [[], []];
	let heighest_length = 0;
	let longest_array: number[] = [];
	for (const arr of arrays) {
		if (arr.length > heighest_length) heighest_length = arr.length;
		longest_array = arr;
	}

	for (let i = 0; i < heighest_length; i++) {
		for (const arr of arrays) {
			if (
				arr.includes(longest_array[i]) &&
				arr.toString() !== longest_array.toString()
			)
				output[0].push(longest_array[i]);
		}
	}

	console.log("output[0]", output[0]);
	return quickSort(output[0]);
}

export function lnko(numbers: number[]): number[][] {
	clear(false);
	let result: number[][] = [[], []];
	const felbontott: number[][][] = [[], []];
	for (const element of numbers) {
		console.log(
			"prime_number_(element, true)[0]",
			prime_number_(element, true)[0],
		);
		console.log(
			"prime_number_(element, true)[1]",
			prime_number_(element, true)[1],
		);

		felbontott[0].push(prime_number_(element, true)[0]);
		felbontott[1].push(prime_number_(element, true)[1]);
	}
	console.log("felbontott", felbontott);
	compareArrays(felbontott[0]);
}
