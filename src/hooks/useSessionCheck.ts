import { ref } from "vue";
import { fetchUserData } from "@/utils/api";
import store from "@/store";
import api from "@/utils/api"; // API 인스턴스 가져오기

const loggedIn = ref(false);
const isChecked = ref(false);

export const useSessionCheck = () => {
  const resetSessionCheck = () => {
    isChecked.value = false;
  };

  const checkSession = async (): Promise<boolean> => {
    if (!isChecked.value) {
      // 서버에서 세션이 유효한지 확인
      const isAuthenticated = await checkAuthOnServer();
      loggedIn.value = isAuthenticated;
      isChecked.value = true;

      if (isAuthenticated) {
        // 세션이 유효하고 userId가 존재하는 경우 유저 정보 업데이트
        const userId = store.getters["user/getUserId"];
        if (userId !== undefined && userId !== null) {
          const userData = await fetchUserData(userId);
          if (userData) {
            store.commit("user/setUser", userData);
          } else {
            console.warn("유저 데이터를 불러오지 못했습니다.");
          }
        } else {
          console.warn("유효한 유저 ID를 찾을 수 없습니다.");
        }
      } else {
        // 세션이 만료된 경우 Vuex의 유저 정보 초기화
        store.commit("user/clearUser");
      }
      console.log("Session checked:", isAuthenticated);
    }
    return loggedIn.value;
  };

  return { loggedIn, checkSession, resetSessionCheck };
};

// 내부용 함수로 서버에서 인증 상태 확인
const checkAuthOnServer = async (): Promise<boolean> => {
  try {
    const response = await api.get("/users/sessionCheck");
    if (response.status === 200 && response.data.authenticated) {
      const user = response.data.user;
      store.commit("user/setUser", user); // Vuex에 유저 정보 업데이트
      return true;
    }
    return false;
  } catch (error) {
    console.error("서버에서 로그인 상태 확인 실패:", error);
    return false;
  }
};
