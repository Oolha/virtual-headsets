import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types";
import { apiLogin, apiRegister, apiLogout, refreshAuth } from "./operations";
import { getToken, getUser } from "./localStorage";

const initialState: AuthState = {
  user: getUser(),
  accessToken: getToken(),
  isLoading: false,
  isLoggedIn: !!getToken(),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Refresh
      .addCase(refreshAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.error = null;
      })
      .addCase(refreshAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.accessToken = null;
        state.error = action.payload as string;
      })
      // Login
      .addCase(apiLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.error = null;
      })
      .addCase(apiLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(apiRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.error = null;
      })
      .addCase(apiRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(apiLogout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.accessToken = null;
        state.error = null;
      })
      .addCase(apiLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
