<template>
    <div
        class="fixed h-screen bg-gray-600 translate-x-[-128px] x-0 transition-all w-32 duration-700 m-0 p-0"
        id="menu"
    >
        <Menupont :x="``" :description="`Főmenü`" :title="``"></Menupont>
        <Menupont
            :x="`prime`"
            :description="`Prímtényezős felbontás`"
            :title="`x|y`"
        ></Menupont>
        <Menupont
            :x="`lnko`"
            :description="`Legnagyobb Közös Osztó`"
            :title="`LNKO`"
        ></Menupont>
        <Menupont
            :x="`lkkt`"
            :description="`Legkisebb Közös Töbszörös`"
            :title="`LKKT`"
        ></Menupont>
    </div>
    <button
        class="rounded-full transition-all bg-gray-600 duration-700 text-center fixed inset-y-1/2 m-auto w-20 text-white text-3xl items-center h-20 opacity-25 hover:opacity-100"
        id="btn_menu"
    >
        >
    </button>
</template>

<script lang="ts" setup>
onMounted(() => {
    let state = false
    const btn = document.querySelector('#btn_menu')
    const navigationbar = document.querySelector('#menu')
    btn?.addEventListener('click', (e) => {
        e.preventDefault()
        state = !state
        if (state) {
            navigationbar?.classList.remove('translate-x-[-128px]')
            navigationbar?.classList.add('translate-x-0')
            btn?.classList.remove('translate-x-0', 'opacity-25')
            btn?.classList.add('translate-x-[128px]', 'opacity-100')
        } else {
            navigationbar?.classList.remove('translate-x-0')
            navigationbar?.classList.add('translate-x-[-128px]')
            btn?.classList.remove('translate-x-[128px]', 'opacity-100')
            btn?.classList.add('translate-x-0', 'opacity-25')
        }
    })
})
</script>

<style></style>
