import { create } from "zustand";

interface HeroState {
    positionCamera: [number, number, number];
    setPositionCamera: (value: [number, number, number]) => void;
}

export const useHeroStore = create<HeroState>((set) => ({
    positionCamera: [-3.5, 1.4, 7],
    setPositionCamera: (value) => set({ positionCamera: value }),
}));