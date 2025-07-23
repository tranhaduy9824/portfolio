import { create } from "zustand";

interface NetworkState {
  showNetwork: boolean;
  setShowNetwork: (value: boolean) => void;

  isAnimationComplete: boolean;
  setIsAnimationComplete: (value: boolean) => void;

  selectedProject: number | null;
  setSelectedProject: (value: number | null) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  showNetwork: false,
  setShowNetwork: (value) => set({ showNetwork: value }),

  isAnimationComplete: true,
  setIsAnimationComplete: (value) => set({ isAnimationComplete: value }),

  selectedProject: null,
  setSelectedProject: (value) => set({ selectedProject: value }),
}));

