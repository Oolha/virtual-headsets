import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Game } from "../types";
import { fetchAllGames, fetchTop5Games } from "./operations";

interface GamesState {
  games: Game[];
  isLoading: boolean;
  error: string | null;
}
const initialState: GamesState = {
  games: [],
  isLoading: false,
  error: null,
};

const handlePending = (state: GamesState) => {
  state.isLoading = true;
  state.error = null;
};
const handleRejected = (
  state: GamesState,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload || "An error occurred";
};

export const sliceGames = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAllGames.fulfilled,
        (state, action: PayloadAction<Game[]>) => {
          state.isLoading = false;
          state.error = null;
          state.games = action.payload;
        }
      )
      .addCase(
        fetchTop5Games.fulfilled,
        (state, action: PayloadAction<Game[]>) => {
          state.isLoading = false;
          state.error = null;
          state.games = action.payload;
        }
      )
      .addCase(fetchAllGames.pending, handlePending)
      .addCase(fetchAllGames.rejected, handleRejected)
      .addCase(fetchTop5Games.pending, handlePending)
      .addCase(fetchTop5Games.rejected, handleRejected);
  },
});

export default sliceGames.reducer;
