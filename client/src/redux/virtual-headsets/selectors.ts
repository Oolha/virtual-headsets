import { RootState } from "../store";
import { VRHeadset } from "../types";

export const selectVRHeadsets = (state: RootState): VRHeadset[] => {
  return state.virtualHeadsets.virtualHeadsets;
};
export const selectIsLoading = (state: RootState): boolean => {
  return state.virtualHeadsets.isLoading;
};
export const selectError = (state: RootState): string | null => {
  return state.virtualHeadsets.error;
};
