export interface digitType {
	value: number;
	pos: number[];
	section: number[];
	posibility: number[];
}
export interface solverOutput {
	possibilities: number;
	solved: digitType[];
}
