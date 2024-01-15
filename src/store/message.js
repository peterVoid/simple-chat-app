import { create } from "zustand";

const useSendingMessage = create((set) => ({
  message: [],
  sendMessage: (messages) =>
    set((state) => ({ message: [...state.message, messages] })),
  getMessage: (message) => set({ message }),
  deleteMessage: (id) =>
    set((state) => ({ message: state.message.filter((x) => x.id !== id) })),
}));

export default useSendingMessage;
