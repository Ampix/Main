<template>
    <input
        class="bg-gray-400 w-[20rem] placeholder:text-white text-center text-xl rounded-lg py-1 focus:bg-gray-600 mx-2 my-1"
        type="number"
        :name="`lnko_${index}`"
        :id="`lnko_${index}`"
        :placeholder="`${index}. szám`"
    />
</template>

<script lang="ts" setup>
const { index } = defineProps(['index'])
</script>
