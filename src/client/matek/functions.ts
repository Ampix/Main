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
	for (const element of benne) {
		if (benne.toString() === keresendo.toString()) {
			console.log("element", element);
			return true;
		}
	}
	return false;
}
