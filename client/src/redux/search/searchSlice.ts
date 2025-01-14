import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VRHeadset, Game, SearchSuggestion, SearchState } from "../types";

const initialState: SearchState = {
  searchTerm: "",
  searchResults: {
    headsets: [],
    games: [],
  },
  suggestions: [],
  isLoading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSearchResults: (
      state,
      action: PayloadAction<{ headsets: VRHeadset[]; games: Game[] }>
    ) => {
      state.searchResults = action.payload;
    },
    setSuggestions: (state, action: PayloadAction<SearchSuggestion[]>) => {
      state.suggestions = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setSearchResults,
  setSuggestions,
  setLoading,
  setError,
} = searchSlice.actions;

export default searchSlice.reducer;
