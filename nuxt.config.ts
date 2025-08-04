import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
//import { Group, Tag } from './types/quaint'必要かわからないので保留

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  ssr: true,
  app: {
    baseURL: "/",
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

  //devtoolsの設定
  devtools: { enabled: true },

  //vuetifyの設定
  build: {
    transpile: ["vuetify", "jsonwebtoken"],
  },

  // https://nuxt.com/modules ここに色々ある
  modules: [
    // https://nuxt.com/modules/stylelint
    "@nuxtjs/stylelint-module",
    //sidebase/nuxt-authについて https://nuxt.com/modules/sidebase-auth
    "@sidebase/nuxt-auth",
    // https://nuxt.com/modules/content
    "@nuxt/content",
    // https://nuxt.com/modules/vite-pwa-nuxt
    [
      "@vite-pwa/nuxt",
      {
        meta: {
          name: "星陵祭",
          author: "IT委員会|東京都立日比谷高等学校",
        },
        manifest: {
          name: "星陵祭",
          short_name: "星陵祭",
          lang: "ja",
        },
      },
    ],
    //QRコード https://nuxt.com/modules/qrcode https://qrcode.s94.dev/
    "nuxt-qrcode",
    // https://nuxt.com/modules/gtag
    ["nuxt-gtag", { id: "G-3R9RL31VGF", debug: true }],
    //VuetifyのコンポーネントやスタイルをVite経由で自動インポート
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error Viteの型定義がVuetifyプラグインを正しく認識できない
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],

  css: ["~/assets/css/main.css"],

  // 環境変数
  runtimeConfig: {
    //ブラウザからも確認可能な値はpublicに入れる
    public: {
      apiBase: "", //NUXT_PUBLIC_API_BASEに書き換えられる
    },
  },

  // 参考 https://github.com/sidebase/nuxt-auth
  auth: {
    isEnabled: true,
    provider: {
      type: "local",
      baseURL: "/api/auth",
      endpoints: {
        getSession: { path: "/user" },
        signIn: { path: "/login", method: "post" },
        logout: false,
      },
      pages: {
        login: "/login",
      },
      token: {
        signInResponseTokenPointer: "/token", // 要確認レスポンス例: { token: "JWT" }
        type: "Bearer",
        headerName: "Authorization",
        cookieName: "auth.token",
        maxAgeInSeconds: 60 * 60 * 24 * 30, // 30日間
        sameSiteAttribute: process.env.SAME_SITE_ATTRIBUTE,
        secureCookieAttribute: process.env.SECURE_COOKIE_ATTRIBUTE === "true",
        httpOnlyCookieAttribute:
          process.env.HTTP_ONLY_COOKIE_ATTRIBUTE === "true",
      },
      session: {
        dataType: {
          sub: "string",
          groups: "string[]",
          name: "string",
          exp: "number",
          iss: "string",
          jti: "string",
        },
        dataResponsePointer: "/",
      },
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
  },

  //public配下のファイルを適切に処理する
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
  //プラグイン設定
  plugins: ["~/plugins/vuetify.ts"],

  //cloudflareにデプロイするための設定 https://nitro.build/deploy/providers/cloudflare#cloudflare-workers
  nitro: {
    preset: "cloudflare",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
    prerender: {
      routes: ["/"],
    },
  },
});
