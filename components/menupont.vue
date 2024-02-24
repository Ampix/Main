<template>
    <div class="">
        <button
            class="mt-2 ml-1 text-center text-3xl p-10 transition-transform duration-1000 hover: bg-blue-500 rounded-3xl text-white group-hover:translate-x-0 translate-x-[-100px] hover:bg-blue-950"
            id="btn"
        >
            x|y
            <span
                class="group-hover:scale-100 absolute w-auto p-3 m-3 mx-20 min-w-max left-14 rounded-md text-white bg-gray-600 text-xl font-bold transition-all duration-100 scale-0"
                >Prímtényezős felbontás</span
            >
        </button>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
onMounted(() => {
    const btn = document.querySelector('#btn')
    btn?.addEventListener('click', (e) => {
        e.preventDefault()
    })
})
</script>

<style></style>
