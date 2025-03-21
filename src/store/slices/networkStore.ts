import { create } from "zustand";

interface NetworkState {
  showNetwork: boolean;
  setShowNetwork: (value: boolean) => void;
  isAnimationComplete: boolean;
  setIsAnimationComplete: (value: boolean) => void;
  areIconsVisible: boolean;
  setAreIconsVisible: (value: boolean) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  showNetwork: false,
  setShowNetwork: (value) => set({ showNetwork: value }),
  isAnimationComplete: true,
  setIsAnimationComplete: (value) => set({ isAnimationComplete: value }),
  areIconsVisible: false,
  setAreIconsVisible: (value) => set({ areIconsVisible: value }),
}));
