// src/hooks/useSessionCheck.ts
import { ref } from "vue";
import { checkAuthOnServer } from "@/utils/api";

// 공유 상태
const loggedIn = ref(false);
const isChecked = ref(false);

export const useSessionCheck = () => {
  const checkSession = async (): Promise<boolean> => {
    if (!isChecked.value) {
      const isAuthenticated = await checkAuthOnServer();
      loggedIn.value = isAuthenticated;
      isChecked.value = true;
      console.log("Session checked:", isAuthenticated);
    }
    return loggedIn.value;
  };

  return { loggedIn, checkSession };
};
