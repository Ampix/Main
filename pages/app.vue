<template>
    <div>
        <h1 class="text-white text-center font-bold">Átirányítás...</h1>
    </div>
</template>

<script lang="ts" setup>
await navigateTo(
    'https://github.com/Ampix/App/releases/latest/download/ampix-app-setup.exe',
    { external: true }
)
</script>
