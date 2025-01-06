import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VRHeadset, Game } from "../types";

interface SearchState {
  searchTerm: string;
  searchResults: {
    headsets: VRHeadset[];
    games: Game[];
  };
}

const initialState: SearchState = {
  searchTerm: "",
  searchResults: {
    headsets: [],
    games: [],
  },
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
  },
});

export const { setSearchTerm, setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
