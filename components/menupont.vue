<template>
    <div class="grid grid-cols-2 text-center gap-[150px]">
        <button
            :id="`btn${x}`"
            class="mx-[12px] my-2 text-3xl w-[104px] h-[104px] bg-blue-500 rounded-3xl text-white duration-300 hover:bg-blue-950 transition-all"
        >
            {{ title }}
        </button>
        <span
            :id="`ds${x}`"
            class="transition-all size-0 w-52 h-fit mt-6 p-2 opacity-0 text-white rounded-md bg-gray-600 duration-300 font-bold text-lg"
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
    const ds = document.querySelector(`#ds${x}`)
    btn?.addEventListener('mouseover', (e) => {
        e.preventDefault()
        ds?.classList.remove('opacity-0')
    })
    btn?.addEventListener('mouseout', (e) => {
        e.preventDefault()
        ds?.classList.add('opacity-0')
    })
    btn?.addEventListener('click', (e) => {
        e.preventDefault()
        router.push(`/matek/${x}`)
    })
})
</script>

<style></style>
