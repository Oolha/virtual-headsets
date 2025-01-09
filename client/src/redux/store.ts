import { configureStore, combineReducers } from "@reduxjs/toolkit";
import virtualHeadsetsReducer from "./virtual-headsets/slice";
import gamesReducer from "./games/slice";
import searchReducer from "./search/searchSlice";
import cartReducer from "./cart/cartSlice";
import authReducer from "./auth/slice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"],
};

const rootReducer = combineReducers({
  virtualHeadsets: virtualHeadsetsReducer,
  games: gamesReducer,
  search: searchReducer,
  cart: cartReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["_persist"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
