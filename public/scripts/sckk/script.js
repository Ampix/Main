// src/client/sckk/script.ts
async function SCKK(logs) {
  document.getElementById("loadhelp")?.classList.remove("!hidden");
  document.getElementById("draghelp")?.classList.add("hidden");
  if (dates.length > 1) {
    fo["Összesen"] = {
      emberek: {},
      lemondott: 0,
      egyperces: 0
    };
  }
  for (const nap in fo) {
    if (nap !== "\xD6sszesen") {
      for (let i = 0;i < workerNum; i++) {
        const worker = new Worker("/scripts/sckk/worker.js", {
          type: "module"
        });
        workers[nap].push(worker);
        worker.postMessage({
          logs,
          nap,
          hanyszor: hivasszam / workerNum,
          start: hivasszam / workerNum * i,
          dates
        });
        worker.onmessage = (ev) => {
          worker.terminate();
          workers[ev.data.nap].splice(workers[ev.data.nap].indexOf(worker), 1);
          if (workers[ev.data.nap].length === 0) {
            delete workers[ev.data.nap];
          }
          if (Object.keys(ev.data.fo.emberek).length > 1) {
            fo[ev.data.nap].lemondott += ev.data.fo.lemondott;
            fo[ev.data.nap].egyperces += ev.data.fo.egyperces;
            for (const ember in ev.data.fo.emberek) {
              if (fo[ev.data.nap].emberek[ember]) {
                fo[ev.data.nap].emberek[ember]["műszak"] += ev.data.fo.emberek[ember]["műszak"];
                fo[ev.data.nap].emberek[ember]["összesen"] += ev.data.fo.emberek[ember]["összesen"];
                fo[ev.data.nap].emberek[ember]["bműszak"] += ev.data.fo.emberek[ember]["bműszak"];
              } else {
                fo[ev.data.nap].emberek[ember] = {
                  "műszak": ev.data.fo.emberek[ember]["műszak"],
                  "összesen": ev.data.fo.emberek[ember]["összesen"],
                  "bműszak": ev.data.fo.emberek[ember]["bműszak"]
                };
              }
            }
            if (dates.length > 1) {
              fo["Összesen"].lemondott += ev.data.fo["Összesen"].lemondott;
              fo["Összesen"].egyperces += ev.data.fo["Összesen"].egyperces;
            }
            for (const ember in ev.data.fo["Összesen"].emberek) {
              if (fo["Összesen"].emberek[ember]) {
                fo["Összesen"].emberek[ember]["műszak"] += ev.data.fo["Összesen"].emberek[ember]["műszak"];
                fo["Összesen"].emberek[ember]["összesen"] += ev.data.fo["Összesen"].emberek[ember]["összesen"];
                fo["Összesen"].emberek[ember]["bműszak"] += ev.data.fo["Összesen"].emberek[ember]["bműszak"];
              } else {
                fo["Összesen"].emberek[ember] = {
                  "műszak": ev.data.fo["Összesen"].emberek[ember]["műszak"],
                  "összesen": ev.data.fo["Összesen"].emberek[ember]["összesen"],
                  "bműszak": ev.data.fo["Összesen"].emberek[ember]["bműszak"]
                };
              }
            }
            console.log(fo);
            doneReturn();
          } else if (Object.keys(ev.data.vfo).length > 0) {
            for (const ember in ev.data.vfo) {
              if (fo_vontatos[ev.data.nap][ember]) {
                fo_vontatos[ev.data.nap][ember] += ev.data.vfo[ember];
              } else {
                fo_vontatos[ev.data.nap][ember] = ev.data.vfo[ember];
              }
            }
            console.log(fo_vontatos);
            doneReturn();
          } else {
            doneReturn();
          }
        };
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}
var doneReturn = function() {
  let jancsi = 0;
  if (canDo) {
    for (const manas in fo) {
      if (manas !== "\xD6sszesen") {
        handleReturn(manas);
      } else {
        if (dates.length > 1) {
          handleReturn(manas);
        }
      }
    }
  } else {
    for (const nap of dates) {
      if (!workers[nap]) {
        jancsi++;
      }
      if (jancsi === dates.length) {
        canDo = true;
        doneReturn();
      }
    }
  }
};
var handleReturn = function(nap) {
  console.log("handle", nap);
  if (Object.keys(fo[nap].emberek).length > 0) {
    console.log(nap, "- K\xE9sz");
    document.getElementById("loadhelp")?.classList.add("!hidden");
    const napok = document.getElementById("napok");
    const ezanap = document.createElement("div");
    ezanap.id = nap;
    napok?.appendChild(ezanap);
    const napcim = document.createElement("h1");
    napcim.innerText = nap;
    napcim.classList.add("font-semibold", "text-xl", "my-2", "bg-gray-900", "-mx-10");
    ezanap.appendChild(napcim);
    const muszakcim = document.createElement("h2");
    muszakcim.innerText = "A m\u0171szak";
    muszakcim.classList.add("font-semibold", "mb-2", "text-lg");
    ezanap.appendChild(muszakcim);
    const amuszak = document.createElement("div");
    for (const data in fo[nap].emberek) {
      if (fo[nap].emberek[data]["műszak"] > 0) {
        const item = document.createElement("h2");
        item.innerText = `- ${data}: ${fo[nap].emberek[data]["műszak"]}`;
        amuszak?.appendChild(item);
      }
    }
    amuszak?.lastElementChild?.classList.add("mb-5");
    ezanap.appendChild(amuszak);
    const lemondott = document.createElement("h2");
    lemondott.innerText = `- Lemondott: ${fo[nap].lemondott}`;
    amuszak?.appendChild(lemondott);
    const egyperces = document.createElement("h2");
    egyperces.innerText = `- 1 perces: ${fo[nap].egyperces}`;
    egyperces.classList.add("mb-5");
    amuszak?.appendChild(egyperces);
    const osszescim = document.createElement("h2");
    osszescim.innerText = "\xD6sszesen";
    osszescim.classList.add("font-semibold", "mb-2", "text-lg");
    ezanap.appendChild(osszescim);
    const osszes = document.createElement("div");
    for (const data in fo[nap].emberek) {
      if (tagok.includes(data)) {
        if (fo[nap].emberek[data]["bműszak"] > 0) {
          const item = document.createElement("h2");
          item.innerText = `- ${data}: ${fo[nap].emberek[data]["összesen"]} (${fo[nap].emberek[data]["műszak"]}+${fo[nap].emberek[data]["bműszak"]}+${fo[nap].emberek[data]["összesen"] - (fo[nap].emberek[data]["műszak"] + fo[nap].emberek[data]["bműszak"])})`;
          osszes?.appendChild(item);
        } else {
          const item = document.createElement("h2");
          item.innerText = `- ${data}: ${fo[nap].emberek[data]["összesen"]}`;
          osszes?.appendChild(item);
        }
      } else {
        if (fo[nap].emberek[data]["bműszak"] > 0) {
          const item = document.createElement("h2");
          item.classList.add("notamuszak");
          item.innerText = `- ${data}: ${fo[nap].emberek[data]["összesen"]} (${fo[nap].emberek[data]["műszak"]}+${fo[nap].emberek[data]["bműszak"]}+${fo[nap].emberek[data]["összesen"] - (fo[nap].emberek[data]["műszak"] + fo[nap].emberek[data]["bműszak"])}) [NEM A]`;
          osszes?.appendChild(item);
        } else {
          const item = document.createElement("h2");
          item.classList.add("notamuszak");
          item.innerText = `- ${data}: ${fo[nap].emberek[data]["összesen"]} [NEM A]`;
          osszes?.appendChild(item);
        }
      }
    }
    ezanap.appendChild(osszes);
    document.getElementById("csakamuszakbtn")?.classList.remove("hidden");
  }
  if (nap !== "\xD6sszesen") {
    if (Object.keys(fo_vontatos[nap]).length > 0) {
      console.log(`Vontat\xF3s ${nap}`, "- K\xE9sz");
      document.getElementById("loadhelp")?.classList.add("!hidden");
      const napok = document.getElementById("napok");
      const ezanap = document.createElement("div");
      ezanap.id = `v${nap}`;
      napok?.appendChild(ezanap);
      const napcim = document.createElement("h1");
      napcim.innerText = `Vontat\xF3s ${nap}`;
      napcim.classList.add("font-semibold", "text-xl", "my-2", "bg-gray-900", "-mx-10");
      ezanap.appendChild(napcim);
      const osszescim = document.createElement("h2");
      osszescim.innerText = "\xD6sszesen";
      osszescim.classList.add("font-semibold", "mb-2", "text-lg");
      ezanap.appendChild(osszescim);
      const osszes = document.createElement("div");
      for (const data in fo_vontatos[nap]) {
        const item = document.createElement("h2");
        item.innerText = `- ${data}: ${fo_vontatos[nap][data]}`;
        osszes?.appendChild(item);
      }
      ezanap.appendChild(osszes);
    }
  }
};
var dropZone = document.getElementById("drop-zone");
dropZone?.addEventListener("dragover", (ev) => {
  ev.preventDefault();
  if (lefutott) {
    location.reload();
  }
});
var fo = {};
var fo_vontatos = {};
var lefutott = false;
var dates = [];
dropZone?.addEventListener("drop", (ev) => {
  ev.preventDefault();
  lefutott = true;
  const logs = [];
  const fiels = ev.dataTransfer?.files.length;
  let filesProcessed = 0;
  if (!ev.dataTransfer)
    return;
  for (const file of ev.dataTransfer.files) {
    const reader = new FileReader;
    reader.onload = (event) => {
      const fileContent = event.target?.result;
      const lines = fileContent?.toString().split("\n");
      if (!lines)
        return;
      for (const line of lines) {
        if (line.split(" ")[0].slice(1) !== "") {
          if (!fo[line.split(" ")[0].slice(1)]) {
            fo[line.split(" ")[0].slice(1)] = {
              emberek: {},
              lemondott: 0,
              egyperces: 0
            };
          } else if (!fo_vontatos[line.split(" ")[0].slice(1)]) {
            fo_vontatos[line.split(" ")[0].slice(1)] = {};
          }
          if (!fo[line.split(" ")[0].slice(1)] || !fo_vontatos[line.split(" ")[0].slice(1)]) {
            workers[line.split(" ")[0].slice(1)] = [];
            dates.push(line.split(" ")[0].slice(1));
          }
        }
        logs.push(line.trim());
      }
      filesProcessed++;
      if (filesProcessed === fiels) {
        SCKK(logs);
      }
    };
    reader.readAsText(file);
  }
});
var tagok = [
  "Danelson Benjamin",
  "Cristobal Armenteros",
  "Bill Ches",
  "Nick Norton",
  "Bryan R Black",
  "Ellis Olivia",
  "Gregori Gustav",
  "Michael Brighs",
  "Lost O Brian",
  "Lisa Vaston",
  "Lola Maywurm",
  "Tellez Eduardo",
  "Aniko Maywurm",
  "Edgar Shaw"
];
var workerNum = 5;
var hivasszam = 2000;
var workers = {};
document.getElementById("alertbox")?.addEventListener("click", (ev) => {
  ev.preventDefault();
  document.getElementById("alertbox")?.classList.add("hidden");
});
var canDo = false;
document.getElementById("csakamuszakbtn")?.addEventListener("click", (ev) => {
  ev.preventDefault();
  for (const i of document.getElementsByClassName("notamuszak")) {
    if (i.classList.contains("hidden")) {
      i.classList.remove("hidden");
    } else {
      i.classList.add("hidden");
    }
  }
});
