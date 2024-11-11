// src/store/index.ts
import { createStore } from "vuex";
import photoStore from "./photoStore";
import userStore from "./userStore";

const store = createStore({
  modules: {
    photo: photoStore,
    user: userStore,
  },
});

export default store;
