// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ROUTES } from "../utils/constants";
import HomeView from "../views/HomeView.vue";
import ErrorPage from "@/views/ErrorPage.vue";

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
    path: ROUTES.CONNECTION.path,
    name: ROUTES.CONNECTION.name,
    component: () =>
      import(/* webpackChunkName: "connetion" */ "../views/ConnectionView.vue"),
  },
  {
    path: ROUTES.DETAIL.path,
    name: ROUTES.DETAIL.name,
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/DetailPost.vue"),
  },
  {
    path: ROUTES.ERROR.path,
    name: ROUTES.ERROR.name,
    component: ErrorPage,
    props: {
      errorCode: 404,
      errorMessage:
        "페이지를 찾을 수 없습니다. \n 올바른 주소를 입력해 주세요.",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
