import { Console, time } from "node:console";
import json from "./szavak.json";
const szavak = json.szavak1;
// console.log(json);
let points = 0;
let index = 0;
const indexes: number[] = [];
function valszto(): string {
	indexes.push(index);
	const magyar_szó = szavak[index].magyar;

	const szó = document.getElementById("szó");
	if (szó) {
		szó.innerText = `${magyar_szó[0].toUpperCase()}${magyar_szó.slice(
			1,
			magyar_szó.length,
		)} (${index + 1}/${szavak.length})`;
	}
	return magyar_szó;
}

function ellenorzo(
	magyar: string,
	nemet: string,
	perfekt: string,
	prateritum: string,
	perfekt_bonus: string,
) {
	const eredmeny = document.getElementById("eredmeny");
	const lenyeg = document.getElementById("lenyeg");
	// const valasz = szavak.find((element) => element.magyar === magyar);
	if (eredmeny && lenyeg) {
		const megoldasindex = index;
		const perfekt_bonusreal = szavak[megoldasindex].perfect.split(" ")[0];
		const perfekt_real = szavak[megoldasindex].perfect.split(" ")[1];
		const magyar_real = szavak[megoldasindex].magyar;
		const nemet_real = szavak[megoldasindex].német;
		const prateritum_real = szavak[megoldasindex].prateritum;
		console.log(perfekt_bonus, perfekt_bonusreal);
		console.log(
			nemet_real === nemet,
			prateritum_real === prateritum,
			perfekt_real === perfekt,
			perfekt_bonus === perfekt_bonusreal,
		);
		eredmeny.classList.remove("hidden");
		lenyeg.classList.add("hidden");
		if (
			magyar_real === magyar &&
			nemet_real === nemet &&
			prateritum_real === prateritum &&
			perfekt_real === perfekt &&
			perfekt_bonus === perfekt_bonusreal
		) {
			eredmeny.innerText = "A szavak helyesek";
			eredmeny.classList.add("text-green-500");
			points++;
		} else {
			eredmeny.classList.add("text-red-700");
			eredmeny.innerText = `A helyes megoldások a következők:\n ${szavak[megoldasindex].német}, ${szavak[megoldasindex].perfect}  és ${szavak[megoldasindex].prateritum}`;
		}
		let tmp = Math.floor(Math.random() * (szavak.length - 1));
		while (indexes.includes(tmp))
			tmp = Math.floor(Math.random() * (szavak.length - 1));
		index = tmp;
		valszto();
		setTimeout(() => {
			document.getElementById("lenyeg")?.classList.remove("hidden");
			document.getElementById("lenyeg")?.classList.add("grid");
			document.getElementById("eredmeny")?.classList.add("hidden");
		}, 1994);
	}
}
document.getElementById("start_btn")?.addEventListener("click", (e) => {
	e.preventDefault();
	document.getElementById("start")?.classList.add("hidden");
	document.getElementById("lenyeg")?.classList.remove("hidden");
	document.getElementById("lenyeg")?.classList.add("grid");

	valszto();
});
document.getElementById("nemet")?.addEventListener("submit", (e) => {
	e.preventDefault();
	const data = new FormData(e.target as HTMLFormElement);
	const nemet = String(Object.fromEntries(data.entries()).nemet);

	const prateritum = String(Object.fromEntries(data.entries()).prateritum);
	const perfekt = String(Object.fromEntries(data.entries()).perfekt);
	const perfekt_bonus = String(
		Object.fromEntries(data.entries()).perfekt_bonus,
	);

	ellenorzo(valszto(), nemet, perfekt, prateritum, perfekt_bonus);
	(document.getElementById("nemet") as HTMLFormElement)?.reset();
});
