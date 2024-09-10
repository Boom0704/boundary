// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ROUTES } from "../utils/constants";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: ROUTES.HOME.path,
    name: ROUTES.HOME.name,
    component: HomeView,
  },
  {
    path: ROUTES.ABOUT.path,
    name: ROUTES.ABOUT.name,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: ROUTES.MYPAGE.path,
    name: ROUTES.MYPAGE.name,
    component: () =>
      import(/* webpackChunkName: "myPage" */ "../views/MyPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
