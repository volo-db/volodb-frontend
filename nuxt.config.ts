// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true,

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1', charset: 'UTF-8' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: './assets/favicon.svg' }]
    }
  },

  css: ['./assets/main.css'],
  plugins: ['./plugins/pinia.js'],
  modules: ['@pinia/nuxt']
})