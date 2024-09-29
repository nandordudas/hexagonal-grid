import type { OutgoingHttpHeaders } from 'node:http'

const sharedArratBufferHeaders = {
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
} satisfies OutgoingHttpHeaders

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  future: { compatibilityVersion: 4 },
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@vueuse/nuxt'],
  $development: {
    vite: {
      server: { headers: sharedArratBufferHeaders },
    },
    nitro: {
      routeRules: {
        '**': { headers: sharedArratBufferHeaders },
      },
    },
  },
})
