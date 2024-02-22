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
                        class="bg-blue-400 w-[20rem] placeholder:text-white text-center text-xl rounded-lg py-1 focus:bg-blue-600 mr-2.5"
                        type="number"
                        name="lnko_1"
                        placeholder="1. szám"
                    />

                    <button
                        id="plussz"
                        class="bg-blue-400 px-2 py-1 rounded-lg text-xl font-bold mt-3 sm:mt-3 hover:bg-blue-600"
                    >
                        +
                    </button>
                    <button
                        type="submit"
                        class="bg-blue-400 px-2 py-1 rounded-lg text-xl font-bold mt-3 sm:mt-3 hover:bg-blue-600"
                    >
                        Feldolgozás
                    </button>
                </form>
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
    let index = 2

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
            'mr-2.5'
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

        let számok = []

        for (let i = 1; i < index; i++) {
            számok.push(Number(formData.get(`lnko_${i}`)))
        }
        console.log(számok)
    })
})
</script>
