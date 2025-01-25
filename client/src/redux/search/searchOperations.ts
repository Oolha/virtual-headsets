import { AppDispatch, RootState } from "../store";
import {
  setSearchResults,
  setSearchTerm,
  setSuggestions,
  setLoading,
  setError,
} from "./searchSlice";
import { SearchSuggestion } from "../types";

export const getSuggestions =
  (searchTerm: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(setLoading(true));
      const { virtualHeadsets, games } = getState();

      //Filter VRs
      const headsetSuggestions = virtualHeadsets.virtualHeadsets
        .filter((headset) =>
          headset.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 3)
        .map(
          (headset): SearchSuggestion => ({
            id: headset._id,
            name: headset.name,
            type: "catalog",
            category: "VR Headsets",
            photo: headset.photo,
          })
        );

      //Filter games
      const gameSuggestions = games.games
        .filter((game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 3)
        .map(
          (game): SearchSuggestion => ({
            id: game._id,
            name: game.name,
            type: "game",
            category: "Games",
            photo: game.photo,
          })
        );

      // Combine
      const suggestions = [...headsetSuggestions, ...gameSuggestions];

      dispatch(setSuggestions(suggestions));
      dispatch(setLoading(false));
      dispatch(setError(null));
    } catch (error) {
      dispatch(
        setError(
          error instanceof Error ? error.message : "Failed to get suggestions"
        )
      );
      dispatch(setLoading(false));
    }
  };

export const performSearch =
  (searchTerm: string) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(setLoading(true));
      const { virtualHeadsets, games } = getState();

      const filteredHeadsets = virtualHeadsets.virtualHeadsets.filter(
        (headset) =>
          headset.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const filteredGames = games.games.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      dispatch(setSearchTerm(searchTerm));
      dispatch(
        setSearchResults({
          headsets: filteredHeadsets,
          games: filteredGames,
        })
      );
      dispatch(setLoading(false));
      dispatch(setError(null));
    } catch (error) {
      dispatch(
        setError(error instanceof Error ? error.message : "Search failed")
      );
      dispatch(setLoading(false));
    }
  };
