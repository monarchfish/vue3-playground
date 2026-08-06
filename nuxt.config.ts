// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Pins Nitro/Nuxt behavior to this date so future framework updates
  // do not silently change runtime semantics in this learning project.
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  // Pinia (state), Tailwind (styling), VueUse (composables), Icon (Heroicons/Logos),
  // and ESLint (lint integration) — each module auto-registers its Nuxt plugin layer.
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxt/icon', '@nuxt/eslint'],

  // Default document metadata; individual pages can override via useHead().
  app: {
    head: {
      title: 'Vue3 Playground - 學習 Vue 3',
      meta: [{ name: 'description', content: 'Vue 3 互動式學習平台' }],
    },
  },

  // Global styles loaded on every page — Tailwind layers and shared component classes.
  css: ['~/assets/css/main.css'],

  // Auto-import composables and helpers from `stores/` so Pinia stores
  // are usable in pages without explicit import statements.
  imports: {
    dirs: ['stores'],
  },

  // Strict mode catches common TS mistakes; typeCheck runs vue-tsc during dev/build
  // so template type errors surface before runtime.
  typescript: {
    strict: true,
    typeCheck: true,
  },
})
