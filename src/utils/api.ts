// src/utils/api.ts
import axios from "axios";
import { useCookies } from "vue3-cookies";
import store from "@/store";
import { IPost } from "@/interface/IModels";

// 쿠키 설정
const { cookies } = useCookies();

// Axios 기본 설정
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// 로그인 API 호출 함수
export const loginUser = async (loginData: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post("/users/signin", loginData);
    if (response && response.status === 200) {
      const jsessionid = response.headers["set-cookie"]?.find((cookie) =>
        cookie.startsWith("JSESSIONID")
      );
      if (jsessionid) {
        const sessionId = jsessionid.split(";")[0].split("=")[1];
        cookies.set("JSESSIONID", sessionId, "7d");
      }

      store.commit("user/setUser", response.data.user);
      return response;
    }
    return false;
  } catch (error) {
    console.error("로그인 실패:", error);
    return false;
  } finally {
    const storedUser = store.getters["user/getUser"];
    console.log("스토어에 저장된 유저 데이터:", storedUser);
  }
};

// 회원가입 API 호출 함수
export const signupUser = async (userData: {
  email: string;
  password: string;
  username: string;
  birthday: string;
  gender: string;
}) => {
  try {
    const formattedBirthday =
      userData.birthday.replace(/\./g, "-") + "T00:00:00";
    return await api.post("/users/signup", {
      ...userData,
      birthday: formattedBirthday,
    });
  } catch (error) {
    console.error("회원가입 실패:", error);
    return false;
  }
};

// 로그아웃 API 호출 함수
export const logoutUser = async () => {
  try {
    const response = await api.post("/users/logout");
    if (response.status === 200) {
      const domain = window.location.hostname;
      document.cookie = `JSESSIONID=; Path=/; Domain=${domain}; Max-Age=0;`;
      store.commit("user/clearUser");
      console.log("로그아웃 성공: JSESSIONID 쿠키가 삭제되었습니다.");
      return true;
    }
    console.error("로그아웃 실패: 서버 응답이 200이 아님");
    return false;
  } catch (error) {
    console.error("로그아웃 요청 중 오류 발생:", error);
    return false;
  }
};

// 계정 삭제 API 호출 함수
export const deleteUser = async (userId: number) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.status === 200;
  } catch (error) {
    console.error("계정 삭제 실패:", error);
    return false;
  }
};

// 유저 정보를 가져오는 API 함수
export const fetchUserData = async (userId: number) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("유저 정보 가져오기 실패:", error);
    return null;
  }
};

export const uploadMultipleFiles = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await api.post("/common/upload-multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // 파일 URL 리스트 반환
  } catch (error) {
    console.error("파일 업로드 실패:", error);
    return [];
  }
};

export const createPost = async (postPayload: IPost) => {
  try {
    console.log("postPayload: ", postPayload);
    const response = await api.post("/posts", postPayload);
    return response.data;
  } catch (error) {
    console.error("게시물 생성 실패:", error);
    throw error;
  }
};

// 활성화된 게시물 목록을 가져오는 함수
export const fetchActivePosts = async () => {
  try {
    const response = await api.get("/posts/active");
    return response.data; // 게시물 데이터 반환
  } catch (error) {
    console.error("Error fetching active posts:", error);
    throw error;
  }
};

export default api;
