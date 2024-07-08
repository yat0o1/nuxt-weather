// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-07-03",
  hooks: {
    'prerender:routes' ({ routes }) {
      routes.clear();
    }
  },
  modules: ['@nuxtjs/tailwindcss', "@nuxtjs/i18n"],
  i18n:{
    lazy: true,
    langDir: "locales",
    strategy: "no_prefix",
    locales: [
      {
        code: "en-US",
        iso: "en-US",
        name: "English(US)",
        file: "en-US.json",
      },
      {
        code: "kk-KZ",
        iso: "kk-KZ",
        name: "Kazakh",
        file: "kk-KZ.json",
      },
      {
        code: "ru-RU",
        iso: "ru-RU",
        name: "Russian",
        file: "ru-RU.json",
      },
    ],
    defaultLocale: "en-US",
  },
})