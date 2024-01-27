import { Console } from "node:console";
import json from "./szavak.json";
const szavak = json.szavak;
// console.log(json);

function szav_valaszt() {
	const szó = document.getElementById("magyar");
	if (szó) {
		const index = 0;

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
		} else {
			eredmeny.innerText = `A szavak nem helyesek, mert a helyes megoldások a következők ${szavak[megoldasindex].német}, ${szavak[megoldasindex].perfect} és ${szavak[megoldasindex].präteritum}`;
		}
	}
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
