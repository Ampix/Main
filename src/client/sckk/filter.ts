const final: string[] = [];

const tagok = [
	"Danelson Benjamin",
	"Bryan R Black",
	"Edgar Shaw",
	"Lisa Vaston",
	"Gregori Gustav",
	"Michael Brighs",
	"Ellis Olivia",
	"Bill Ches",
	"Benjamin Gayle",
	"Marcus Dodson",
	"James William",
	"James Willliam",
];

document.getElementById("app-form")?.addEventListener("submit", (ev) => {
	ev.preventDefault();
	const formdata = new FormData(ev.target as HTMLFormElement);
	if (formdata.get("type") === ("all" || "a")) {
		formdata
			.get("log")
			?.toString()
			.split("\n")
			.forEach((line, index) => {
				if (formdata.get("type") === "all") {
					if (line.trim() !== "") {
						const mama = line.split(":");
						if (tagok.includes(mama[0])) {
							final.push(line);
						}
					}
				}
				if (formdata.get("type") === "a") {
					const mama = line.split(":");
					const cuccs = mama[1].split("+");
					if (cuccs[0].trim() !== "0") {
						final.push(`${mama[0]}: ${cuccs[0].trim()}`);
					}
				}
			});
	}
	if (formdata.get("type") === "temp") {
		const cucc = JSON.parse(formdata.get("log")?.toString() as string);
		for (const man of cucc) {
			if (tagok.includes(man.driver)) {
				final.push(`${man.driver}: ${man.count}`);
			}
		}
	}
	const doc = document.getElementById("return");
	while (doc?.firstChild) {
		doc.removeChild(doc.firstChild);
	}
	for (const jana of final) {
		const text = document.createElement("h2");
		text.innerText = jana;
		doc?.appendChild(text);
	}
	document.getElementById("form")?.classList.add("hidden");
	document.getElementById("return")?.classList.remove("hidden");
});
