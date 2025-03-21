import { useHeroStore } from "./slices/heroStore";
import { useNetworkStore } from "./slices/networkStore";

export const useAppStore = () => ({
  ...useNetworkStore(),
  ...useHeroStore(),
});
