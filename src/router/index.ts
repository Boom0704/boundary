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
  {
    path: ROUTES.ADDPAGE.path,
    name: ROUTES.ADDPAGE.name,
    component: () =>
      import(/* webpackChunkName: "AddPage" */ "../views/AddPage.vue"),
  },
  {
    path: ROUTES.PROFILE.path,
    name: ROUTES.PROFILE.name,
    component: () =>
      import(/* webpackChunkName: "ProfileView" */ "../views/ProfileView.vue"), // ProfileView.vue 파일을 동적으로 로드
  },
  {
    path: ROUTES.LOGIN.path,
    name: ROUTES.LOGIN.name,
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/LoginView.vue"),
  },
  {
    path: ROUTES.CONECTION.path,
    name: ROUTES.CONECTION.name,
    component: () =>
      import(/* webpackChunkName: "conetion" */ "../views/ConnectionView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
