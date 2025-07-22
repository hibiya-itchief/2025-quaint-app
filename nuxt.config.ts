import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {},
  compatibilityDate: "2024-04-03",
  ssr: true,
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    //...
    // "@sidebase/nuxt-auth",
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
});
