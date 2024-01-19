interface jonas extends MessageEvent {
	data: {
		logs: string[];
		nap: string;
		hanyszor: number;
		start: number;
		dates: string[];
	};
}

const akezdet = new Date().setHours(15, 0, 0, 0);
const avege = new Date().setHours(18, 30, 0, 0);
const bvege = new Date().setHours(22, 0, 0, 0);

interface ember {
	műszak: number;
	összesen: number;
	bműszak: number;
}

interface emberjson {
	[key: string]: ember;
}

interface all {
	emberek: emberjson;
	lemondott: number;
	egyperces: number;
}

interface muszak {
	emberek: emberjson;
	lemondott: number;
	egyperces: number;
	Összesen: all;
}

const fo: muszak = {
	emberek: {},
	lemondott: 0,
	egyperces: 0,
	Összesen: {
		emberek: {},
		lemondott: 0,
		egyperces: 0,
	},
};

interface vontatos {
	[key: string]: number;
}

const vontatos_fo: vontatos = {};

onmessage = async (ev: jonas) => {
	for (let i = ev.data.start; i < ev.data.hanyszor + ev.data.start; i++) {
		const tesztmama = ev.data.logs.findLastIndex(
			(element) =>
				element.startsWith(`[${ev.data.nap}`) &&
				element.endsWith(`(Taxi)]: Új hívás érkezett: ${i}`),
		);
		const index = ev.data.logs.findLastIndex(
			(element) =>
				element.startsWith(`[${ev.data.nap}`) &&
				element.endsWith(`TAXI elfogadta a következő hívást: ${i}`),
		);
		if (tesztmama !== -1 || index !== -1) {
			if (index !== -1) {
				const most = new Date().setHours(
					Number(
						ev.data.logs[index]
							.split(" ")[1]
							.slice(undefined, -1)
							.split(":")[0],
					),
					Number(
						ev.data.logs[index]
							.split(" ")[1]
							.slice(undefined, -1)
							.split(":")[1],
					),
					Number(
						ev.data.logs[index]
							.split(" ")[1]
							.slice(undefined, -1)
							.split(":")[2],
					),
					0,
				);
				const cuccman = ev.data.logs[index]
					.split(":")[4]
					.split("/")[0]
					.slice(1, -1);
				if (cuccman !== "senki") {
					if (fo.emberek[cuccman]) {
						if (akezdet < most && most < avege) {
							fo.emberek[cuccman].összesen++;
							fo.emberek[cuccman].műszak++;
						} else if (most > avege && bvege > most) {
							fo.emberek[cuccman].összesen++;
							fo.emberek[cuccman].bműszak++;
						} else {
							fo.emberek[cuccman].összesen++;
						}
					} else {
						if (akezdet < most && most < avege) {
							fo.emberek[cuccman] = {
								műszak: 1,
								összesen: 1,
								bműszak: 0,
							};
						} else if (most > avege && bvege > most) {
							fo.emberek[cuccman] = {
								műszak: 0,
								összesen: 1,
								bműszak: 0,
							};
						} else {
							fo.emberek[cuccman] = {
								műszak: 0,
								összesen: 1,
								bműszak: 0,
							};
						}
					}
					if (ev.data.dates.length > 1) {
						if (fo.Összesen.emberek[cuccman]) {
							if (akezdet < most && most < avege) {
								fo.Összesen.emberek[cuccman].összesen++;
								fo.Összesen.emberek[cuccman].műszak++;
							} else if (most > avege && bvege > most) {
								fo.Összesen.emberek[cuccman].összesen++;
								fo.Összesen.emberek[cuccman].bműszak++;
							} else {
								fo.Összesen.emberek[cuccman].összesen++;
							}
						} else {
							if (akezdet < most && most < avege) {
								fo.Összesen.emberek[cuccman] = {
									műszak: 1,
									összesen: 1,
									bműszak: 0,
								};
							} else if (most > avege && bvege > most) {
								fo.Összesen.emberek[cuccman] = {
									műszak: 0,
									összesen: 1,
									bműszak: 1,
								};
							} else {
								fo.Összesen.emberek[cuccman] = {
									műszak: 0,
									összesen: 1,
									bműszak: 0,
								};
							}
						}
					}
				}
			} else {
				const ujhivas = ev.data.logs.findLastIndex(
					(element) =>
						element.startsWith(`[${ev.data.nap}`) &&
						element.endsWith(
							`[SeeMTA - Tablet (Taxi)]: Új hívás érkezett: ${i}`,
						),
				);
				if (ujhivas !== -1) {
					const most = new Date().setHours(
						Number(
							ev.data.logs[ujhivas]
								.split(" ")[1]
								.slice(undefined, -1)
								.split(":")[0],
						),
						Number(
							ev.data.logs[ujhivas]
								.split(" ")[1]
								.slice(undefined, -1)
								.split(":")[1],
						),
						Number(
							ev.data.logs[ujhivas]
								.split(" ")[1]
								.slice(undefined, -1)
								.split(":")[2],
						),
						0,
					);
					const torolve = ev.data.logs.findLastIndex(
						(element) =>
							element.startsWith(`[${ev.data.nap}`) &&
							element.includes(`Törlődött a következő hívás: ${i}`) &&
							element.endsWith("TAXI törölte)"),
					);
					const elfogadva = ev.data.logs.findLastIndex(
						(element) =>
							element.startsWith(`[${ev.data.nap}`) &&
							element.endsWith(`TAXI elfogadta a következő hívást: ${i}`),
					);
					if (torolve !== -1 && elfogadva === -1) {
						const elf = new Date().setHours(
							Number(
								ev.data.logs[torolve]
									.split(" ")[1]
									.slice(undefined, -1)
									.split(":")[0],
							),
							Number(
								ev.data.logs[torolve]
									.split(" ")[1]
									.slice(undefined, -1)
									.split(":")[1],
							),
							Number(
								ev.data.logs[torolve]
									.split(" ")[1]
									.slice(undefined, -1)
									.split(":")[2],
							),
							0,
						);
						if (most - elf <= 60000) {
							fo.egyperces++;
							if (ev.data.dates.length > 1) {
								fo.Összesen.egyperces++;
							}
						}
					} else {
						const lemondott = ev.data.logs.findLastIndex(
							(element) =>
								element.startsWith(`[${ev.data.nap}`) &&
								element.includes(
									`Törlődött a következő hívás: ${i} (lemondta a játékos)`,
								),
						);
						const lemondott2 = ev.data.logs.findLastIndex(
							(element) =>
								element.startsWith(`[${ev.data.nap}`) &&
								element.endsWith(`TAXI elfogadta a következő hívást: ${i}`),
						);
						if (lemondott !== -1 && lemondott2 === -1) {
							const most = new Date().setHours(
								Number(
									ev.data.logs[lemondott]
										.split(" ")[1]
										.slice(undefined, -1)
										.split(":")[0],
								),
								Number(
									ev.data.logs[lemondott]
										.split(" ")[1]
										.slice(undefined, -1)
										.split(":")[1],
								),
								Number(
									ev.data.logs[lemondott]
										.split(" ")[1]
										.slice(undefined, -1)
										.split(":")[2],
								),
								0,
							);
							if (akezdet < most && most < avege) {
								fo.lemondott++;
								if (ev.data.dates.length > 1) {
									fo.Összesen.lemondott++;
								}
							}
						}
					}
				}
			}
		} else {
			const vontatos = ev.data.logs.findLastIndex(
				(element) =>
					element.startsWith(`[${ev.data.nap}`) &&
					element.endsWith(`TOW elfogadta a következő hívást: ${i}`),
			);
			if (vontatos !== -1) {
				const cuccman = ev.data.logs[vontatos]
					.split(":")[4]
					.split("/")[0]
					.slice(1, -1);
				if (vontatos_fo[cuccman]) {
					vontatos_fo[cuccman]++;
				} else {
					vontatos_fo[cuccman] = 1;
				}
			}
		}
		await new Promise((resolve) => setTimeout(resolve, 0));
	}
	postMessage({ nap: ev.data.nap, fo, vfo: vontatos_fo });
};
