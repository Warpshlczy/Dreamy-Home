import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  // nuxt的工作路径
  srcDir: "src/",
  //是否开启dev调试工具
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  //运行时基础配置
  runtimeConfig: {
    // 公共api访问地址
    public: {
      baseURL: "http://121.40.22.67:8080/api",
    },
  },
  // 对components文件夹下的组件进行配置
  components: [
    // 限制components下所有的组件拓展为.vue
    {
      path: "~/components",
      extensions: [".vue"],
    },

    // 扫描components和components所有子目录并自动引入
    { path: "~/components/welcome", pathPrefix: false },
    { path: "~/components" },
  ],
  //引入vuetify
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  // 开发配置服务器
  devServer: {
    port: 8081,
    host: "0.0.0.0",
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/global.scss";',
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
