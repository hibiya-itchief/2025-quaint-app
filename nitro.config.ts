export default defineNitroConfig({
  preset: "cloudflare_pages",
  cloudflare: {
    deployConfig: true,
    nodeCompat: true,
  },
  prerender: {
    autoSubfolderIndex: false,
  },
});
