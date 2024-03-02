<template>
    <div class="grid grid-cols-2 text-center gap-[150px]">
        <button
            :id="`btn${x}`"
            class="mx-[12px] my-2 text-3xl w-[104px] h-[104px] bg-blue-500 rounded-3xl text-white hover:bg-blue-950 transition-all duration-700 group"
        >
            {{ title }}
        </button>
        <span
            :id="`ds${x}`"
            class="group-hover:opacity-100 transition-all opacity-0 text-white rounded-md bg-gray-600 duration-500 w-52 h-fit mt-6 p-2 font-bold text-lg"
        >
            {{ description }}
        </span>
    </div>
</template>

<script lang="ts" setup>
const { x, description, title } = defineProps(['x', 'description', 'title'])
const router = useRouter()

onMounted(() => {
    const id = `btn${x}`
    const btn = document.querySelector(`#${id}`)

    btn?.addEventListener('click', (e) => {
        e.preventDefault()
        router.push(`/matek/${x}`)
    })
})
</script>

<style></style>
