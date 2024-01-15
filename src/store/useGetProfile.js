import { create } from "zustand";

const useGettingProfile = create((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));

export default useGettingProfile;
