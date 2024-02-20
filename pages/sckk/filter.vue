import { onMounted } from 'vue';
<template>
    <div class="flex h-screen">
        <div class="m-auto">
            <div id="form">
                <form
                    action="javascript:;"
                    id="app-form"
                    class="grid grid-rows-1 gap-5"
                >
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <h1>Log:</h1>
                            <textarea
                                name="log"
                                id="log"
                                class="bg-slate-800 w-full h-[20vh] rounded-xl p-5"
                            ></textarea>
                        </div>
                        <div>
                            <h2>Tagok:</h2>
                            <textarea
                                name="tagok"
                                id="tagok"
                                class="bg-slate-800 w-full h-[20vh] rounded-xl p-5"
                            ></textarea>
                        </div>
                    </div>
                    <select
                        name="type"
                        class="bg-slate-800 text-center font-bold text-xl"
                    >
                        <option value="all">
                            Összes (/hivasok, A műszakosok listázása)
                        </option>
                        <option value="a">
                            A műszak (SCKK App, A műszakos hívások csak)
                        </option>
                        <option value="temp">Ideiglenes API</option>
                    </select>
                    <button
                        type="submit"
                        class="bg-slate-800 rounded-xl font-bold text-xl px-3 py-1"
                    >
                        Kezelés
                    </button>
                </form>
            </div>
            <div id="return" class="hidden text-center"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
onMounted(() => {
    const final: string[] = []
    const tagok: string[] = []

    document.querySelector('#app-form')?.addEventListener('submit', (ev) => {
        ev.preventDefault()
        const formdata = new FormData(ev.target as HTMLFormElement)
        if (formdata) {
            if (formdata.get('tagok')) {
                for (const line of formdata
                    .get('tagok')
                    ?.toString()
                    .split('\n') as string[]) {
                    if (line !== '') {
                        tagok.push(line.trim())
                    }
                }
            }
            if (['all', 'a'].includes(formdata.get('type') as string)) {
                formdata
                    .get('log')
                    ?.toString()
                    .split('\n')
                    .forEach((line, index) => {
                        if (formdata.get('type') === 'all') {
                            if (line.trim() !== '') {
                                const mama = line.split(':')
                                console.log(mama)
                                if (tagok.includes(mama[0])) {
                                    final.push(line)
                                }
                            }
                        }
                        if (formdata.get('type') === 'a') {
                            const mama = line.split(':')
                            const cuccs = mama[1].split('+')
                            if (cuccs[0].trim() !== '0') {
                                final.push(`${mama[0]}: ${cuccs[0].trim()}`)
                            }
                        }
                    })
            }
            if (formdata.get('type') === 'temp') {
                const cucc = JSON.parse(
                    formdata.get('log')?.toString() as string
                )
                for (const man of cucc) {
                    if (tagok.includes(man.driver)) {
                        final.push(`${man.driver}: ${man.count}`)
                    }
                }
            }
            const doc = document.querySelector('#return')
            while (doc?.firstChild) {
                doc.removeChild(doc.firstChild)
            }
            for (const jana of final) {
                const text = document.createElement('h2')
                text.innerText = jana
                doc?.appendChild(text)
            }
            document.querySelector('#form')?.classList.add('hidden')
            document.querySelector('#return')?.classList.remove('hidden')
        }
    })
})
</script>
