// src/utils/api.ts
import axios from "axios";

// Axios 기본 설정
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // 예: 'http://localhost:8820'
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 세션 기반 인증 시 쿠키 전송 설정
});

// 요청 인터셉터 (필요 시 확장 가능)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 로그인 API 호출 함수
export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/users/login", loginData);
    return response;
  } catch (error) {
    console.error("로그인 실패:", error);
    return false;
  }
};

// 회원가입 API 호출 함수 (signupUser)
export const signupUser = async (userData: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
    const response = await api.post("/users/signup", userData);
    return response;
  } catch (error) {
    console.error("회원가입 실패:", error);
    return false;
  }
};

// 서버에서 로그인 상태 확인 함수
export const checkAuthOnServer = async (): Promise<boolean> => {
  try {
    const response = await api.get("/auth/check");
    return response.status === 200;
  } catch (error) {
    console.error("서버에서 로그인 상태 확인 실패:", error);
    return false;
  }
};

export default api;
