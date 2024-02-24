<template>
    <div
        class="fixed h-screen w-6 bg-gray-600 hover:w-32 transition-all duration-700 group m-0"
        id="menu"
    >
        <Menupont
            :x="`prime`"
            :description="`Prímtényezős felbontás`"
            :title="`x|y`"
        ></Menupont>
        <Menupont
            :x="`lnko`"
            :description="`LegNagyobb Közös Osztó`"
            :title="`Lnko`"
        ></Menupont>
        <Menupont
            :x="`lkkt`"
            :description="`LegKisebb Közös Töbszörös`"
            :title="`Lkkt`"
        ></Menupont>
    </div>
</template>

<script lang="ts" setup></script>

<style></style>
