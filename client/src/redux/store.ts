import { configureStore } from "@reduxjs/toolkit";
import virtualHeadsetsReducer from "./virtual-headsets/slice";
import gamesReducer from "./games/slice";

export const store = configureStore({
  reducer: {
    virtualHeadsets: virtualHeadsetsReducer,
    games: gamesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
