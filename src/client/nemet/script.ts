import json from "./szavak.json";
const szavak = json.szavak;
// console.log(json);

function szav_valaszt() {
	const szó = document.getElementById("magyar");
	if (szó) {
		const index = 0;
		console.log(szavak[index].magyar);
		szó.innerText = szavak[index].magyar;
	}
}
szav_valaszt();
function ellenorzo(magyar, nemet, perfekt, prateritum) {
	if (szavak[szavak.indexOf(magyar) == magyar]) {
		console.log("pryma");
	}
}
document.getElementById("nemet")?.addEventListener("submit", (e) => {
	e.preventDefault();
	const data = new FormData(e.target as HTMLFormElement);
	const nemet = Object.fromEntries(data.entries()).nemet;
	const perfekt = Object.fromEntries(data.entries()).perfekt;
	const prateritum = Object.fromEntries(data.entries()).prateritum;
	console.log(nemet, perfekt, prateritum);
});
