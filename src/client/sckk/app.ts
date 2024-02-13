interface calls {
    [key: string]: {
        a: number
        b: number
        c: number
    }
}

interface muszaks {
    [key: string]: {
        egyperces: number
        lemondott: number
        összesen: number
    }
}

const hívások: calls = {}
const műszakok: muszaks = {
    a: {
        egyperces: 0,
        lemondott: 0,
        összesen: 0,
    },
    b: {
        egyperces: 0,
        lemondott: 0,
        összesen: 0,
    },
    c: {
        egyperces: 0,
        lemondott: 0,
        összesen: 0,
    },
}

document.getElementById('app-form')?.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const formdata = new FormData(ev.target as HTMLFormElement)
    formdata
        .get('log')
        ?.toString()
        .split('\n')
        .forEach((line, index) => {
            const mama = line.split('\t')
            const akezdet = new Date(mama[3]).setHours(15, 0, 0, 0)
            const avege = new Date(mama[3]).setHours(18, 30, 0, 0)
            const bvege = new Date(mama[3]).setHours(22, 0, 0, 0)
            if (
                mama[0] !== 'Lemondott' &&
                mama[0].length > 1 &&
                mama[2] === 'Accepted'
            ) {
                if (!hívások[mama[0]]) {
                    hívások[mama[0]] = {
                        a: 0,
                        b: 0,
                        c: 0,
                    }
                }
                const date = new Date(mama[3])
                if (akezdet > Number(date)) {
                    hívások[mama[0]].c++
                    műszakok.c.összesen++
                }
                if (Number(date) > akezdet && avege > Number(date)) {
                    hívások[mama[0]].a++
                    műszakok.a.összesen++
                }
                if (Number(date) > avege && bvege > Number(date)) {
                    hívások[mama[0]].b++
                    műszakok.b.összesen++
                }
                if (Number(date) > bvege) {
                    hívások[mama[0]].c++
                    műszakok.c.összesen++
                }
            } else {
                if (mama[0] === 'Lemondott') {
                    const date = new Date(mama[3])
                    if (akezdet > Number(date)) {
                        műszakok.c.lemondott++
                    }
                    if (Number(date) > akezdet && avege > Number(date)) {
                        műszakok.a.lemondott++
                    }
                    if (Number(date) > avege && bvege > Number(date)) {
                        műszakok.b.lemondott++
                    }
                    if (Number(date) > bvege) {
                        műszakok.c.lemondott++
                    }
                }
            }
        })
    console.log(hívások)
    console.log(műszakok)
    const cont = document.getElementById('return')
    cont?.classList.remove('hidden')
    document.getElementById('form')?.classList.add('hidden')
    for (const műszak of Object.keys(műszakok)) {
        if (cont) {
            const titel = document.createElement('h1')
            titel.innerText = `${műszak.toUpperCase()} műszak`
            titel.classList.add('text-xl', 'font-bold')
            const egyperces = document.createElement('h2')
            egyperces.innerText = `egyperces: ${műszakok[műszak].egyperces}`
            const lemondott = document.createElement('h2')
            lemondott.innerText = `lemondott: ${műszakok[műszak].lemondott}`
            const összesen = document.createElement('h2')
            összesen.innerText = `összesen: ${műszakok[műszak].összesen}`
            összesen.classList.add('mb-2')
            cont.appendChild(titel)
            cont.appendChild(egyperces)
            cont.appendChild(lemondott)
            cont.appendChild(összesen)
        }
    }
    for (const ember of Object.keys(hívások)) {
        if (cont) {
            const titel = document.createElement('h1')
            titel.innerText = `${ember}: ${hívások[ember].a} + ${hívások[ember].b} + ${hívások[ember].c}`
            cont.appendChild(titel)
        }
    }
})
