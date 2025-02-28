import { useNetworkStore } from "./slices/networkStore";

export const useAppStore = () => ({
  ...useNetworkStore(),
});
