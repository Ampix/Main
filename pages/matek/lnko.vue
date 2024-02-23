<template>
    <Title>Legnagyobb közös osztó</Title>

    <div class="text-white font-mono">
        <div class="text-center items-center justify-center">
            <div class="bg-blue-500 py-5">
                <h1 class="text-3xl mb-3 font-semibold">
                    Legnagyobb közös osztó kiszámitása
                </h1>
                <form id="lnko_form">
                    <input
                        class="bg-blue-400 w-[20rem] placeholder:text-white text-center text-xl rounded-lg py-1 focus:bg-blue-600 mx-2"
                        type="number"
                        name="lnko_1"
                        placeholder="1. szám"
                    />
                    <input
                        class="bg-blue-400 w-[20rem] placeholder:text-white text-center text-xl rounded-lg py-1 focus:bg-blue-600 mx-2 my-1"
                        type="number"
                        name="lnko_2"
                        placeholder="2. szám"
                    />

                    <button
                        id="plussz"
                        class="bg-blue-400 px-5 py-1 rounded-lg text-xl font-bold hover:bg-blue-600 mx-2"
                    >
                        &#x2B;
                    </button>
                    <button
                        type="submit"
                        class="bg-blue-400 px-10 py-1 rounded-lg text-xl font-bold mt-3 sm:mt-3 hover:bg-blue-600 mx-2 break-all"
                    >
                        Feldolgozás
                    </button>
                </form>
                <div id="summarized"></div>

                <div id="error"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { lnko } from './index.vue'
import { onMounted } from 'vue'

onMounted(() => {
    const plus = document.querySelector('#plussz')
    const form = document.querySelector('#lnko_form')
    let index = 3

    plus?.addEventListener('click', (e) => {
        e.preventDefault()

        const jozsi = document.createElement('input')

        jozsi.classList.add(
            'bg-blue-400',
            'w-[20rem]',
            'placeholder:text-white',
            'text-center',
            'text-xl',
            'rounded-lg',
            'py-1',
            'focus:bg-blue-600',
            'mx-2.5',
            'my-1'
        )
        jozsi.name = `lnko_${index}`
        jozsi.placeholder = `${index}. szám`
        jozsi.type = 'number'
        index++

        form?.insertBefore(jozsi, plus)
    })

    form?.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(form as HTMLFormElement)

        const summarized = document.querySelector('#summarized')

        let számok = []

        for (let i = 1; i < index; i++) {
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
            const index = result[0].indexOf(element)

            const szám = document.createElement('span')

            szám.innerText = element.toString()
            szám.classList.add('text-3xl', 'font-bold')
            summarized?.appendChild(szám)

            if (result[1][index] > 1) {
                const hatvány = document.createElement('sup')
                hatvány.innerText = result[1][index].toString()
                hatvány.classList.add('text-base', 'text-xl')
                szám.appendChild(hatvány)
            }

            if (result[0][index + 1]) {
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
