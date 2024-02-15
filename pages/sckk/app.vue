<template>
    <div class="flex h-screen">
        <div class="m-auto">
            <h2>A C műszak a maradékot jelenti!</h2>
            <div id="form">
                <h1 class="text-center">
                    Kérlek rakd be ide az App kódját! (Egyperces számítása még
                    nem működik)
                </h1>
                <form
                    action="javascript:;"
                    id="app-form"
                    class="grid grid-rows-1 gap-5"
                >
                    <textarea
                        name="log"
                        id="log"
                        class="w-[80vw] h-[80vh] bg-slate-800 rounded-xl p-5"
                    ></textarea>
                    <button
                        type="submit"
                        class="bg-slate-800 rounded-xl font-bold text-xl px-3 py-1"
                    >
                        Kezelés
                    </button>
                </form>
            </div>
            <div id="return" class="hidden text-center"></div>
        </div>
    </div>
</template>
