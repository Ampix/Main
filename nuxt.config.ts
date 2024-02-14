// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'Ampix',
        },
    },
    devtools: { enabled: true },
    modules: ['@formkit/auto-animate', '@nuxt/ui'],
})
