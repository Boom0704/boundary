import axios from "axios";

// Axios 기본 설정
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 회원가입 API 호출 함수
export const signupUser = (userData: any) => {
  return api.post("/users/signup", userData);
};

export default api;
