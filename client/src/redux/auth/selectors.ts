import { RootState } from "../store";

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAuthIsRefreshing = (state: RootState) =>
  state.auth.isRefreshing;
export const selectAuthError = (state: RootState) => state.auth.error;
