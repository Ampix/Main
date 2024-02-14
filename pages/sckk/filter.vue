<script setup lang="ts">
import { ref } from 'vue'
const fajtak = [
    'Összes (/hivasok)',
    'SCKK App (Műszakra bontás)',
    'Ideiglenes API',
]

const fajta = ref(fajtak[0])
</script>

<template>
    <div class="flex h-screen">
        <div class="m-auto">
            <div id="form">
                <form
                    action="javascript:;"
                    id="app-form"
                    class="grid grid-rows-1 gap-5"
                >
                    <div class="grid grid-cols-2 gap-2">
                        <UTextarea
                            name="log"
                            id="log"
                            size="xl"
                            :rows="7"
                            placeholder="Log"
                        ></UTextarea>
                        <UTextarea
                            name="tagok"
                            id="tagok"
                            size="xl"
                            :rows="7"
                            placeholder="Tagok"
                        ></UTextarea>
                    </div>
                    <USelect v-model="fajta" :options="fajtak" />
                    <UButton
                        type="submit"
                        color="primary"
                        class="bg-slate-800 rounded-xl font-bold text-xl px-3 py-1"
                    >
                        Kezelés
                    </UButton>
                </form>
            </div>
            <div id="return" class="hidden text-center"></div>
        </div>
    </div>
</template>
