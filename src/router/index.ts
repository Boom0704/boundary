// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ROUTES } from "../utils/constants";
import HomeView from "../views/HomeView.vue";
import ErrorPage from "@/views/ErrorPage.vue";
import { useSessionCheck } from "@/hooks/useSessionCheck";

const routes: Array<RouteRecordRaw> = [
  {
    path: ROUTES.HOME.path,
    name: ROUTES.HOME.name,
    component: HomeView,
    meta: { requiresAuth: true }, // 인증이 필요한 페이지
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
    meta: { requiresAuth: true }, // 인증이 필요한 페이지
  },
  {
    path: ROUTES.ADDPAGE.path,
    name: ROUTES.ADDPAGE.name,
    component: () =>
      import(/* webpackChunkName: "AddPage" */ "../views/AddPage.vue"),
    meta: { requiresAuth: true }, // 인증이 필요한 페이지
  },
  {
    path: ROUTES.PROFILE.path,
    name: ROUTES.PROFILE.name,
    component: () =>
      import(/* webpackChunkName: "ProfileView" */ "../views/ProfileView.vue"),
    meta: { requiresAuth: true }, // 인증이 필요한 페이지
  },
  {
    path: ROUTES.LOGIN.path,
    name: ROUTES.LOGIN.name,
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/LoginView.vue"),
    meta: { guestOnly: true }, // 로그인된 유저는 접근 불가
  },
  {
    path: ROUTES.CONNECTION.path,
    name: ROUTES.CONNECTION.name,
    component: () =>
      import(
        /* webpackChunkName: "connection" */ "../views/ConnectionView.vue"
      ),
    meta: { requiresAuth: true }, // 인증이 필요한 페이지
  },
  {
    path: ROUTES.DETAIL.path,
    name: ROUTES.DETAIL.name,
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/DetailPost.vue"),
    meta: { requiresAuth: true }, // 인증이 필요한 페이지
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

// 전역 가드: 로그인 유효성 확인
router.beforeEach(async (to, from, next) => {
  const { checkSession } = useSessionCheck();

  const isAuthenticated = await checkSession();
  console.log("Is authenticated:", isAuthenticated);

  // 인증이 필요한 페이지에 접근할 경우
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next({ name: ROUTES.LOGIN.name }); // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    }
  }

  // 로그인된 사용자는 로그인 페이지로 접근하지 못하게 설정
  if (to.matched.some((record) => record.meta.guestOnly)) {
    if (isAuthenticated) {
      return next({ name: ROUTES.HOME.name }); // 로그인된 사용자는 홈으로 리다이렉트
    }
  }

  next(); // 리다이렉트 조건에 맞지 않으면 다음으로 넘어감
});

export default router;
