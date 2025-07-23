import { create } from "zustand";

interface HeroState {
    positionCamera: [number, number, number];
    setPositionCamera: (value: [number, number, number]) => void;

    sound: boolean;
    setSound: (value: boolean) => void;

    mouseSelected: boolean;
    setMouseSelected: (value: boolean) => void;

    isLoaded: boolean;
    setIsLoaded: (value: boolean) => void;

    isLampOn: boolean;
    setIsLampOn: (value: boolean) => void;
    toggleLamp: () => void;
}

export const useHeroStore = create<HeroState>((set) => ({
    positionCamera: [-3.5, 1.4, 7],
    setPositionCamera: (value) => set({ positionCamera: value }),

    sound: true,
    setSound: (value) => set({ sound: value }),

    mouseSelected: false,
    setMouseSelected: (value) => set({ mouseSelected: value }),

    isLoaded: false,
    setIsLoaded: (value) => set({ isLoaded: value }),

    isLampOn: localStorage.getItem("isLampOn") === "true",
    setIsLampOn: (value) => {
        localStorage.setItem("isLampOn", String(value));
        set({ isLampOn: value });
    },
    toggleLamp: () => {
        set((state) => {
            const newState = !state.isLampOn;
            localStorage.setItem("isLampOn", String(newState));
            return { isLampOn: newState };
        });
    },
}));