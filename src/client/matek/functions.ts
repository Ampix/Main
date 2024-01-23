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

	return 1;
}

export function check_if_one(num: number): boolean {
	return num !== 1;
}

export function array_in_array(
	keresendo: number[],
	benne: number[][],
): boolean {
	// console.log("element", element);
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
