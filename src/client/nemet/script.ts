import json from "./szavak.json";
const szavak = json.szavak;
// console.log(json);
console.log(szavak[0].magyar === "elkezdeni");
console.log("pityu");
function szav_valaszt() {
	const szó = document.getElementById("magyar");
	if (szó) {
		const index = 0;
		console.log(szavak[index].magyar);
		szó.innerText = szavak[index].magyar;
	}
}
szav_valaszt();
function ellenorzo(
	magyar: string,
	nemet: string,
	perfekt: string,
	prateritum: string,
) {
	console.log("siker");
	const megoldasindex = szavak.find((element) => element.magyar === magyar);
	console.log(megoldasindex);

	// if (szavak[megoldasindex].magyar === magyar) {
	// 	console.log("pryma");
	// }
}
document.getElementById("nemet")?.addEventListener("submit", (e) => {
	e.preventDefault();
	const data = new FormData(e.target as HTMLFormElement);
	const nemet = String(Object.fromEntries(data.entries()).nemet);
	const perfekt = String(Object.fromEntries(data.entries()).perfekt);
	const prateritum = String(Object.fromEntries(data.entries()).prateritum);
	ellenorzo("elkezdeni", nemet, perfekt, prateritum);
	console.log(nemet, perfekt, prateritum);
});
