const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/signup": {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        secure: false,
      },
      "/users": {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        secure: false,
      },
      // 필요한 API 엔드포인트를 추가적으로 설정할 수 있습니다.
    },
    port: process.env.VUE_APP_PORT || 8080,
  },
  pwa: {
    name: "Boundary",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    manifestOptions: {
      background_color: "#000000",
    },
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      skipWaiting: true,
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true),
      }),
    ],
  },
});
