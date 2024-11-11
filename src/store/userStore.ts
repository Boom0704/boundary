// src/store/userStore.ts
import { Module, ActionContext } from "vuex";
import { IUser } from "@/interface/IModels";
import { fetchUserData } from "@/utils/api";

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
