import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
//import { Group, Tag } from './types/quaint'必要かわからないので保留

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "ja",
        prefix: "og: http://ogp.me/ns#", // OGPを使う宣言
      },
      titleTemplate: "%s - 日比谷高校星陵祭2025公式サイト",
      title: "星陵祭2025",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          key: "description",
          name: "description",
          content:
            "日比谷高校の文化祭「星陵祭」の公式サイトです。2025年度、第50回星陵祭「紡」は、9月13日(土)・14日(日)の2日間にわたり開催。皆さまのご来場を、心よりお待ちしております。",
        },
        { name: "format-detection", content: "telephone=no" },

        //SNSシェア用の設定 https://kaikoku.blam.co.jp/client/digimaguild/knowledge/sns-pr/498
        {
          key: "og:title",
          property: "og:title",
          content: "日比谷高校星陵祭2025公式サイト",
        },
        {
          key: "og:site_name",
          property: "og:site_name",
          content: "日比谷高校星陵祭2025公式サイト",
        },
        {
          key: "og:url",
          property: "og:url",
          content: "https://2025.seiryofes.com/",
        },
        {
          key: "og:description",
          property: "og:description",
          content:
            "日比谷高校の文化祭「星陵祭」の公式サイトです。2025年度、第50回星陵祭「紡」は、9月13日(土)・14日(日)の2日間にわたり開催。皆さまのご来場を、心よりお待ちしております。",
        },
        {
          key: "og:image",
          property: "og:image",
          content: "https://2025.seiryofes.com/ogpimage.png",
        },
        { key: "og:type", property: "og:type", content: "website" },

        //Twitterカード用の設定 https://developer.x.com/en/docs/x-for-websites/cards/overview/abouts-cards
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@hibiya_IT" },
        {
          key: "twitter:image",
          name: "twitter:image",
          content: "https://2025.seiryofes.com/ogpimage.png",
        },
      ],

      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap",
        },
      ],
    },
  },
  compatibilityDate: "2024-04-03",
  ssr: true,

  devtools: { enabled: true },
  //vuetifyの設定
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
  // 型チェック
  typescript: {
    typeCheck: true,
  },
  // 環境変数
  runtimeConfig: {
    public: {
      apiBase: "", //NUXT_PUBLIC_API_BASEに書き換えられる
    },
  },
  //プラグイン設定
  plugins: ["~/plugins/vuetify.ts"],
});
