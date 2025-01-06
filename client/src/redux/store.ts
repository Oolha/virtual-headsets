import { configureStore } from "@reduxjs/toolkit";
import virtualHeadsetsReducer from "./virtual-headsets/slice";
import gamesReducer from "./games/slice";
import searchReducer from "./search/searchSlice";
import cartReducer from "./cart/cartSlice";

export const store = configureStore({
  reducer: {
    virtualHeadsets: virtualHeadsetsReducer,
    games: gamesReducer,
    search: searchReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
