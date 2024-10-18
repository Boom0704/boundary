import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// toastification 라이브러리 가져오기
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

// Toast 옵션 설정 (필요한 경우)
const options: PluginOptions = {
  // 옵션을 설정할 수 있습니다 (예: duration: 5000, position: "top-right")
};

const app = createApp(App);

app.use(store);
app.use(router);

// Toastification 등록
app.use(Toast, options);

app.mount("#app");
