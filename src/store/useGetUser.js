import { create } from "zustand";

const useGetUserChat = create((set) => ({
  users: [],
  getUsers: (users) => set({ users }),
}));

export default useGetUserChat;
