import { create } from "zustand";

interface NetworkState {
  showNetwork: boolean;
  setShowNetwork: (value: boolean) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  showNetwork: false,
  setShowNetwork: (value) => set({ showNetwork: value }),
}));
