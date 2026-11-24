export default defineNuxtConfig({
  compatibilityDate: '2026-11-24',
  builder: 'vite',
  devtools: { enabled: false },
  css: [
    '@fontsource-variable/montserrat/wght.css',
    '@fontsource-variable/inter/wght.css',
    '~/assets/site.css',
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [{ name: 'theme-color', content: '#ffffff' }],
    },
  },
  routeRules: {
    '/': { prerender: true, noScripts: true },
    '/games': { prerender: true, noScripts: true },
  },
  nitro: {
    // Emit games.html instead of games/index.html so Cloudflare serves the clean /games URL.
    prerender: { autoSubfolderIndex: false },
  },
})
