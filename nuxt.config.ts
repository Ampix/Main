// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            titleTemplate: 'Ampix',
        },
    },
    devtools: { enabled: true },
    modules: ['@formkit/auto-animate', '@nuxtjs/tailwindcss', 'nuxt-icon'],
})
