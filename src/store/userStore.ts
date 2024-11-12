// src/store/userStore.ts
import { Module, ActionContext } from "vuex";
import { IUser } from "@/interface/IModels";
import { fetchUserData, updateUserProfilePicture } from "@/utils/api";

interface UserState {
  user: IUser | null;
}

const userStore: Module<UserState, any> = {
  namespaced: true, // 네임스페이스 활성화
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user: IUser) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    setProfilePicture(state, profilePictureUrl: string) {
      if (state.user) {
        state.user.profilePictureUrl = profilePictureUrl;
      }
    },
  },
  actions: {
    async fetchUser({ commit }: ActionContext<UserState, any>, userId: number) {
      try {
        const userData = await fetchUserData(userId);
        if (userData) {
          commit("setUser", userData);
        }
      } catch (error) {
        console.error("유저 정보를 가져오는 데 실패했습니다:", error);
      }
    },
    async updateProfilePicture(
      { commit, state }: ActionContext<UserState, any>,
      file: File
    ) {
      if (!state.user) {
        console.error("User is not logged in");
        return false;
      }

      try {
        // 파일 업로드를 통해 URL을 얻고 상태 업데이트
        return await updateUserProfilePicture(state.user.id.toString(), file);
      } catch (error) {
        console.error("프로필 업데이트 중 오류 발생:", error);
      }
      return false;
    },
    logout({ commit }) {
      commit("clearUser");
    },
  },
  getters: {
    isAuthenticated(state): boolean {
      return !!state.user;
    },
    getUser(state): IUser | null {
      return state.user;
    },
  },
};

export default userStore;
