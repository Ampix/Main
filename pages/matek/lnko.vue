<template>
    <div class="flex h-screen">
        <div class="m-auto text-center font-bold text-xl">
            <h1 class="text-3xl">Csá!</h1>
            <h2>Időben érkeztél mert itt már van valami!</h2>
            <h3 class="font-light text-lg text-gray-300">De most van!</h3>
        </div>
    </div>
</template>
<script setup lang="ts">
import { lnko } from './index.vue'
lnko([12, 6, 24])
</script>
