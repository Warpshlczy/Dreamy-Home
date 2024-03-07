// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  srcDir: "src/",
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
  ],
  devServer: {
    port: 8081,
    host: "0.0.0.0",
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          addtionalData: '@import "@/assets/scss/main.scss";',
        },
      },
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
