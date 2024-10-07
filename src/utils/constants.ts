// src/utils/constants.ts
export const ROUTES = {
  HOME: {
    name: "home",
    path: "/",
  },
  ABOUT: {
    name: "about",
    path: "/about",
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
    path: "/profile/:id",
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
