const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: process.env.VUE_APP_PORT || 8080,
  },
  pwa: {
    name: "Boundary",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    manifestOptions: {
      background_color: "#000000",
    },
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.ts",
    },
  },
});
