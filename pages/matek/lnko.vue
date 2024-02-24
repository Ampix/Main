<template>
    <Navigationbar></Navigationbar>
    <Title>Legnagyobb közös osztó</Title>

    <!-- <div
        class="text-white font-mono grid grid-cols-2 grid-rows-1 h-screen flex mx-4" -->
    <!-- > -->
    <div class="bg-gray-500 py-5 text-center my-auto rounded-xl w-auto">
        <h1 class="text-3xl mb-3 font-semibold">
            Legnagyobb közös osztó kiszámitása
        </h1>

        <form id="lnko_form">
            <input
                class="bg-gray-400 w-[20rem] placeholder:text-white text-center text-xl rounded-lg py-1 focus:bg-gray-600 mx-2"
                type="number"
                name="lnko_1"
                id="lnko_1"
                placeholder="1. szám"
            />
            <input
                class="bg-gray-400 w-[20rem] placeholder:text-white text-center text-xl rounded-lg py-1 focus:bg-gray-600 mx-2 my-1"
                type="number"
                name="lnko_2"
                id="lnko_2"
                placeholder="2. szám"
            />
            <div id="lnko_buttons">
                <button
                    id="lnko_minus"
                    class="bg-gray-400 px-5 py-1 rounded-lg text-xl font-bold hover:bg-gray-600 mx-2"
                >
                    -
                </button>
                <button
                    type="submit"
                    id="feldolg"
                    class="bg-gray-400 px-10 py-1 rounded-lg text-xl font-bold mt-3 sm:mt-3 hover:bg-gray-600 mx-2 break-all"
                >
                    Feldolgozás
                </button>
                <button
                    id="lnko_plussz"
                    class="bg-gray-400 px-5 py-1 rounded-lg text-xl font-bold hover:bg-gray-600 mx-2 group"
                >
                    &#x2B;
                </button>
            </div>
        </form>
        <div id="lnko_summarized"></div>

        <div id="lnko_error"></div>
    </div>
    <!-- <div
            class="bg-gray-500 py-5 text-center my-auto rounded-xl w-auto mx-4"
        >
            <h1 class="text-3xl mb-3 font-semibold">
                Legkisebb közös töbszörös kiszámitása
            </h1>

            <form id="lkkt_form">
                <input
                    class="bg-gray-400 w-[20rem] placeholder:text-white text-center text-xl rounded-lg py-1 focus:bg-gray-600 mx-2"
                    type="number"
                    name="lkkt_1"
                    id="lkkt_1"
                    placeholder="1. szám"
                />
                <input
                    class="bg-gray-400 w-[20rem] placeholder:text-white text-center text-xl rounded-lg py-1 focus:bg-gray-600 mx-2 my-1"
                    type="number"
                    name="lkkt_2"
                    id="lkkt_2"
                    placeholder="2. szám"
                />
                <div id="lkkt_buttons">
                    <button
                        id="lkkt_minus"
                        class="bg-gray-400 px-5 py-1 rounded-lg text-xl font-bold hover:bg-gray-600 mx-2"
                    >
                        -
                    </button>
                    <button
                        type="submit"
                        id="feldolg"
                        class="bg-gray-400 px-10 py-1 rounded-lg text-xl font-bold mt-3 sm:mt-3 hover:bg-gray-600 mx-2 break-all"
                    >
                        Feldolgozás
                    </button>
                    <button
                        id="lkkt_plussz"
                        class="bg-gray-400 px-5 py-1 rounded-lg text-xl font-bold hover:bg-gray-600 mx-2 group"
                    >
                        &#x2B;
                    </button>
                </div>
            </form>
            <div id="lkkt_summarized"></div>

            <div id="lkkt_error"></div>
        </div> -->
    <!-- </div> -->
</template>
<script setup lang="ts">
import { lnko, lkkt } from './prime.vue'
import { onMounted } from 'vue'
onMounted(() => {
    const lnko_plus = document.querySelector('#lnko_plussz')
    const lnko_form = document.querySelector('#lnko_form')
    const lnko_minus = document.querySelector('#lnko_minus')
    const lnko_buttons = document.querySelector('#lnko_buttons')
    let lnko_index = 3

    lnko_minus?.addEventListener('click', (e) => {
        e.preventDefault()
        const last = document.querySelector(`#lnko_${lnko_index - 1}`)
        if (last && last.id !== `lnko_1`) {
            last.remove()
            lnko_index--
        }
    })

    lnko_plus?.addEventListener('click', (e) => {
        e.preventDefault()

        const jozsi = document.createElement('input')

        jozsi.classList.add(
            'bg-gray-400',
            'w-[20rem]',
            'placeholder:text-white',
            'text-center',
            'text-xl',
            'rounded-lg',
            'py-1',
            'focus:bg-gray-600',
            'mx-2.5',
            'my-1'
        )
        jozsi.name = `lnko_${lnko_index}`
        jozsi.id = `lnko_${lnko_index}`
        console.log(jozsi.id)
        jozsi.placeholder = `${lnko_index}. szám`
        jozsi.type = 'number'
        lnko_index++

        lnko_form?.insertBefore(jozsi, lnko_buttons)
    })

    lnko_form?.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(lnko_form as HTMLFormElement)

        const summarized = document.querySelector('#lnko_summarized')
        if (summarized) {
            summarized.innerHTML = ''
        }

        let számok = []

        for (let i = 1; i < lnko_index; i++) {
            számok.push(Number(formData.get(`lnko_${i}`)))
        }

        számok = számok.filter((element) => {
            return element !== 0
        })

        számok = számok.map((element) => {
            return Math.abs(element)
        })

        console.log(számok)

        const result = lnko(számok)
        let finalResult = 1
        for (let i = 0; i < result[0].length; i++) {
            const element = result[0][i]
            finalResult *= element ** result[1][i]
        }
        console.log(finalResult)

        const cím = document.createElement('span')
        cím.innerHTML = 'lnko('
        for (let i = 0; i < számok.length - 1; i++) {
            const num = számok[i]
            cím.innerHTML += `${num}; `
        }

        cím.innerHTML += `${számok[számok.length - 1]}`
        cím.innerHTML += ')'
        cím.classList.add('text-3xl', 'font-bold')
        cím.innerHTML += `&nbsp=&nbsp;${finalResult}&nbsp=&nbsp;`
        summarized?.appendChild(cím)

        for (const element of result[0]) {
            const lnko_index = result[0].indexOf(element)

            const szám = document.createElement('span')

            szám.innerText = element.toString()
            szám.classList.add('text-3xl', 'font-bold')
            summarized?.appendChild(szám)

            if (result[1][lnko_index] > 1) {
                const hatvány = document.createElement('sup')
                hatvány.innerText = result[1][lnko_index].toString()
                hatvány.classList.add('text-base', 'text-xl')
                szám.appendChild(hatvány)
            }

            if (result[0][lnko_index + 1]) {
                const szorzócska = document.createElement('span')
                szorzócska.innerHTML = '&#183;'
                szorzócska.classList.add('mx-4', 'text-xl', 'font-bold')
                summarized?.appendChild(szorzócska)
            }
        }
        const result_text = document.createElement('h2')

        // result_text?.innerText = ` = ${finalResult}`
        summarized?.appendChild(result_text)
    })

    const lkkt_plus = document.querySelector('#lkkt_plussz')
    const lkkt_form = document.querySelector('#lkkt_form')
    const lkkt_minus = document.querySelector('#lkkt_minus')
    const lkkt_buttons = document.querySelector('#lkkt_buttons')
    let lkkt_index = 3

    lkkt_minus?.addEventListener('click', (e) => {
        e.preventDefault()
        const last = document.querySelector(`#lkkt_${lkkt_index - 1}`)
        if (last && last.id !== `lkkt_1`) {
            last.remove()
            lkkt_index--
        }
    })

    lkkt_plus?.addEventListener('click', (e) => {
        e.preventDefault()

        const pista = document.createElement('input')

        pista.classList.add(
            'bg-gray-400',
            'w-[20rem]',
            'placeholder:text-white',
            'text-center',
            'text-xl',
            'rounded-lg',
            'py-1',
            'focus:bg-gray-600',
            'mx-2.5',
            'my-1'
        )
        pista.name = `lkkt_${lkkt_index}`
        pista.id = `lkkt_${lkkt_index}`
        console.log(pista.id)
        pista.placeholder = `${lkkt_index}. szám`
        pista.type = 'number'
        lkkt_index++

        lkkt_form?.insertBefore(pista, lkkt_buttons)
    })

    lkkt_form?.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(lkkt_form as HTMLFormElement)

        const summarized = document.querySelector('#lkkt_summarized')
        if (summarized) {
            summarized.innerHTML = ''
        }

        let számok = []

        for (let i = 1; i < lkkt_index; i++) {
            számok.push(Number(formData.get(`lkkt_${i}`)))
        }

        számok = számok.filter((element) => {
            return element !== 0
        })

        számok = számok.map((element) => {
            return Math.abs(element)
        })

        console.log(számok)

        const result = lkkt(számok)
        let finalResult = 1
        for (let i = 0; i < result[0].length; i++) {
            const element = result[0][i]
            finalResult *= element ** result[1][i]
        }
        console.log(finalResult)

        const cím = document.createElement('span')
        cím.innerHTML = 'lnko('
        for (let i = 0; i < számok.length - 1; i++) {
            const num = számok[i]
            cím.innerHTML += `${num}; `
        }

        cím.innerHTML += `${számok[számok.length - 1]}`
        cím.innerHTML += ')'
        cím.classList.add('text-3xl', 'font-bold')
        cím.innerHTML += `&nbsp=&nbsp;${finalResult}&nbsp=&nbsp;`
        summarized?.appendChild(cím)

        for (const element of result[0]) {
            const lkkt_index = result[0].indexOf(element)

            const szám = document.createElement('span')

            szám.innerText = element.toString()
            szám.classList.add('text-3xl', 'font-bold')
            summarized?.appendChild(szám)

            if (result[1][lkkt_index] > 1) {
                const hatvány = document.createElement('sup')
                hatvány.innerText = result[1][lkkt_index].toString()
                hatvány.classList.add('text-base', 'text-xl')
                szám.appendChild(hatvány)
            }

            if (result[0][lkkt_index + 1]) {
                const szorzócska = document.createElement('span')
                szorzócska.innerHTML = '&#183;'
                szorzócska.classList.add('mx-4', 'text-xl', 'font-bold')
                summarized?.appendChild(szorzócska)
            }
        }
        const result_text = document.createElement('h2')

        // result_text?.innerText = ` = ${finalResult}`
        summarized?.appendChild(result_text)
    })
})
</script>
