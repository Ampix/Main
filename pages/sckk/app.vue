<template>
    <div class="flex h-screen">
        <div class="m-auto">
            <h2>A C műszak a maradékot jelenti!</h2>
            <div id="form">
                <form
                    action="javascript:;"
                    id="app-form"
                    class="grid grid-rows-1 gap-5"
                >
                    <UTextarea
                        name="log"
                        id="log"
                        size="xl"
                        :rows="13"
                        placeholder="Log"
                    ></UTextarea>
                    <UButton type="submit" class="font-bold text-xl px-3 py-1">
                        Kezelés
                    </UButton>
                </form>
            </div>
            <div id="return" class="hidden text-center"></div>
        </div>
    </div>
</template>
