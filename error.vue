<template>
    <body class="bg-slate-700 text-white text-center">
        <div class="flex h-screen">
            <div class="m-auto">
                <h1 class="font-semibold text-5xl text-red-600">
                    {{ error.statusCode }}
                </h1>
                <h2 class="text-xl">
                    {{
                        errormsgs[error.statusCode]
                            ? errormsgs[error.statusCode]
                            : error.statusMessage
                    }}
                </h2>
            </div>
        </div>
    </body>
</template>

<script setup>
const errormsgs = {
    404: 'A keresett oldal nem található!',
}
const error = useError()
</script>
