import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {
      username: "",
      authToken: "",
      userId: "",
      isAdmin: false,
    },
  }),
  getters: {
    authUser: (state) => state.user,
    getAuthToken: (state) => state.user.authToken,
    isAuth: (state) => (state.user.userId ? true : false),
  },
  persist: true,
});
