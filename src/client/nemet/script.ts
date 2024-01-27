import { Console } from "node:console";
import json from "./szavak.json";
const szavak = json.szavak1;
// console.log(json);
let points = 0;
let index = 0;
function valszto(): string {
	const magyar_szó = szavak[index].magyar;
	const szó = document.getElementById("szó");
	if (szó) {
		szó.innerText = magyar_szó;
	}
	return magyar_szó;
}

function ellenorzo(
	magyar: string,
	nemet: string,
	perfekt: string,
	prateritum: string,
) {
	const eredmeny = document.getElementById("eredmeny");
	const valasz = szavak.find((element) => element.magyar === magyar);
	if (valasz && eredmeny) {
		const megoldasindex = szavak.indexOf(valasz);

		// console.log(szavak[megoldasindex].magyar === magyar);
		// console.log(szavak[megoldasindex].perfect === perfekt);
		// console.log(szavak[megoldasindex].német === nemet);
		// console.log(szavak[megoldasindex].präteritum === prateritum);
		if (
			szavak[megoldasindex].magyar === magyar &&
			szavak[megoldasindex].német === nemet &&
			szavak[megoldasindex].präteritum === prateritum &&
			szavak[megoldasindex].perfect === perfekt
		) {
			eredmeny.innerText = "A szavak helyesek";
			points++;
		} else {
			eredmeny.innerText = `A szavak nem helyesek, mert a helyes megoldások a következők ${szavak[megoldasindex].német}, ${szavak[megoldasindex].perfect} és ${szavak[megoldasindex].präteritum}`;
		}
		index++;
	}
}
document.getElementById("start_btn")?.addEventListener("click", (e) => {
	e.preventDefault();
	document.getElementById("start")?.classList.add("hidden");
	document.getElementById("lenyeg")?.classList.remove("hidden");
});
document.getElementById("nemet")?.addEventListener("submit", (e) => {
	e.preventDefault();
	const data = new FormData(e.target as HTMLFormElement);
	const nemet = String(Object.fromEntries(data.entries()).nemet);

	const perfekt = String(Object.fromEntries(data.entries()).perfekt);
	const prateritum = String(Object.fromEntries(data.entries()).prateritum);

	ellenorzo(valszto(), nemet, perfekt, prateritum);
	console.log(nemet, perfekt, prateritum);
});
