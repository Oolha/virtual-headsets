import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VRHeadset } from "../types";

const FAVORITES_KEY = "user_favorites";

interface FavoritesState {
  items: VRHeadset[];
}

const loadFavoritesFromStorage = (): VRHeadset[] => {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState: FavoritesState = {
  items: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<VRHeadset>) => {
      const exists = state.items.some(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.items));
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.items));
    },
    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem(FAVORITES_KEY);
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
