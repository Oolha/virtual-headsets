// slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiRegister, apiLogin, apiLogout, refreshPage } from "./operations";
import { AuthState, AuthResponse } from "../types";

const INITIAL_STATE: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(apiRegister.pending, (state) => {
        state.error = null;
      })
      .addCase(
        apiRegister.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoggedIn = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(
        apiRegister.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error =
            action?.payload ?? "An error occurred during registration";
        }
      )
      .addCase(apiLogin.pending, (state) => {
        state.error = null;
      })
      .addCase(
        apiLogin.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoggedIn = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.error = null;
        }
      )
      .addCase(
        apiLogin.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action?.payload ?? "An error occurred during login";
        }
      )
      .addCase(apiLogout.pending, (state) => {
        state.error = null;
      })
      .addCase(apiLogout.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(
        apiLogout.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action?.payload ?? "An error occurred during logout";
        }
      )
      .addCase(refreshPage.pending, (state) => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(
        refreshPage.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoggedIn = true;
          state.user = action.payload.user;
          state.isRefreshing = false;
        }
      )
      .addCase(
        refreshPage.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action?.payload ?? "An error occurred during refresh";
          state.isRefreshing = false;
        }
      ),
});

export default authSlice.reducer;
