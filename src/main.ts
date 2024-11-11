import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { globalCookiesConfig } from "vue3-cookies";

// toastification 라이브러리 가져오기
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

// Toast 옵션 설정 (필요한 경우)
const options: PluginOptions = {
  // 예: duration: 5000, position: "top-right"
};

const app = createApp(App);

app.use(store);
app.use(router);

// Toastification 등록
app.use(Toast, options);

// vue3-cookies 설정 및 전역 사용
globalCookiesConfig({
  expireTimes: "30d",
  path: "/",
  domain: "",
  secure: true,
  sameSite: "None",
});

app.mount("#app");
