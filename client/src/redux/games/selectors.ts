import { RootState } from "../store";
import { Game } from "../types";

export const selectGames = (state: RootState): Game[] => {
  return state.games.games;
};
export const selectIsLoading = (state: RootState): boolean => {
  return state.games.isLoading;
};
export const selectError = (state: RootState): string | null => {
  return state.games.error;
};
