// src/utils/constants.ts
export const ROUTES = {
  HOME: {
    name: "home",
    path: "/",
  },
  REQUEST: {
    name: "request",
    path: "/request",
  },
  MYPAGE: {
    name: "myPage",
    path: "/mypage",
  },
  ADDPAGE: {
    name: "addPage",
    path: "/add",
  },
  PROFILE: {
    name: "profile",
    path: "/profile/:username",
  },
  LOGIN: {
    name: "login",
    path: "/login",
  },
  CONNECTION: {
    name: "connection",
    path: "/connection",
  },
  DETAIL: {
    name: "detail",
    path: "/detail/:id",
  },
  ERROR: {
    name: "error",
    path: `/:pathMatch(.*)*`,
  },
};
