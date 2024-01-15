import { create } from "zustand";

const useAuthUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")),
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
}));

export default useAuthUserStore;
