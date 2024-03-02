<template>
    <div
        class="fixed h-screen bg-gray-600 translate-x-[-128px] x-0 transition-all w-32 duration-700 m-0 p-0"
        id="menu"
    >
        <Menupont :x="``" :description="`Főmenü`" :title="`🛖`"></Menupont>
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
        class="rounded-full bg-blue-900 text-center flex m-auto p-10 text-white text-3xl"
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
        } else {
            navigationbar?.classList.remove('translate-x-0')
            navigationbar?.classList.add('translate-x-[-128px]')
        }
    })
})
</script>

<style></style>
