import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
const setPending = (state: AuthState) => {
  state.isLoading = true;
  state.error = null;
};

const setError = (state: AuthState, action: PayloadAction<unknown>) => {
  state.isLoading = false;
  state.error = action.payload as string;
};

const setAuthSuccess = (state: AuthState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.isLoggedIn = true;
  state.user = action.payload.data.user;
  state.accessToken = action.payload.data.accessToken;
  state.error = null;
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
      .addCase(refreshAuth.pending, setPending)
      .addCase(refreshAuth.fulfilled, setAuthSuccess)
      .addCase(refreshAuth.rejected, (state, action) => {
        setError(state, action);
        state.isLoggedIn = false;
        state.user = null;
        state.accessToken = null;
      })
      // Login
      .addCase(apiLogin.pending, setPending)
      .addCase(apiLogin.fulfilled, setAuthSuccess)
      .addCase(apiLogin.rejected, setError)
      // Register
      .addCase(apiRegister.pending, setPending)
      .addCase(apiRegister.fulfilled, setAuthSuccess)
      .addCase(apiRegister.rejected, setError)
      // Logout
      .addCase(apiLogout.pending, setPending)
      .addCase(apiLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.accessToken = null;
        state.error = null;
      })
      .addCase(apiLogout.rejected, setError);
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
