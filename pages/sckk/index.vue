<template>
    <div class="flex h-screen" id="drop-zone">
        <div
            id="majne"
            class="m-auto p-10 rounded-xl pt-1 pb-1 bg-gray-600 text-center"
        >
            <div
                class="flex bg-gray-900 px-10 -mt-1 rounded-tl-xl rounded-tr-xl py-2 text-center justify-center -mx-10 items-end gap-1"
            >
                <h1 class="font-semibold text-3xl">SCKK Log Számláló</h1>
                <h2 class="text-gray-300">
                    by
                    <a
                        class="font-semibold hover:text-blue-400"
                        href="https://github.com/HVCsano"
                        >HVCsano</a
                    >
                </h2>
            </div>
            <h2 class="text-gray-300 font-semibold text-lg" id="draghelp">
                Húzd be ide a logokat
            </h2>
            <div id="loadhelp" class="!hidden">
                <div class="lds-dual-ring"></div>
                <h2 class="text-gray-300 font-semibold text-lg" id="draghelp">
                    Ez sokáig eltarthat, ne töltsd újra az oldalt!
                </h2>
            </div>
            <div id="napok"></div>
            <button
                id="csakamuszakbtn"
                class="hidden bg-blue-600 px-2 py-1 hover:bg-blue-900 rounded-lg mt-2"
            >
                Csak A műszakosok
            </button>
        </div>
    </div>
    <div
        id="alertbox"
        class="fixed hidden bg-red-500 font-semibold left-1/2 opacity-75 transform cursor-pointer -translate-x-1/2 top-5 p-2 rounded-xl"
    >
        <h1>
            Oldal betöltésekor ajánlott egy force refresht (CTRL+F5) alkalmazni.
        </h1>
    </div>
    <div
        class="fixed bg-green-500 font-semibold left-1/2 transform cursor-pointer -translate-x-1/2 top-5 p-2 rounded-xl"
    >
        <h1>
            Az új SCKK Appból
            <a class="text-yellow-200 hover:text-yellow-300" href="/sckk/app"
                >itt</a
            >
            tudsz eredményt kérni.
        </h1>
    </div>
</template>
