// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  // target: 'static',
  modules: ['@nuxthq/ui','@pinia/nuxt'],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      'skipHydrate', // import { skipHydrate } from 'pinia'
    ],
  },
})
