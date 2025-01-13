import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";
import {
  LoginCredentials,
  RegisterCredentials,
  LoginResponse,
  RegisterResponse,
} from "../types";
import {
  saveToken,
  saveUser,
  removeToken,
  removeUser,
  getToken,
} from "./localStorage";

export const instance: AxiosInstance = axios.create({
  baseURL: "https://virtual-headsets-store-api.onrender.com",
});

const setAuthHeader = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = "";
};

export const apiLogin = createAsyncThunk<LoginResponse, LoginCredentials>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await instance.post<LoginResponse>(
        "/auth/login",
        credentials
      );
      const { accessToken, user } = response.data.data;

      setAuthHeader(accessToken);
      saveToken(accessToken);
      saveUser(user);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const apiRegister = createAsyncThunk<LoginResponse, RegisterCredentials>(
  "auth/register",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      await instance.post<RegisterResponse>("/auth/register", credentials);

      const loginResponse = await instance.post<LoginResponse>("/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      const { accessToken, user } = loginResponse.data.data;

      setAuthHeader(accessToken);
      saveToken(accessToken);
      saveUser(user);

      return loginResponse.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const refreshAuth = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    const token = getToken();
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      setAuthHeader(token);
      const response = await instance.get<LoginResponse>("/auth/refresh");
      return response.data;
    } catch (error: any) {
      removeToken();
      removeUser();
      clearAuthHeader();
      return rejectWithValue(
        error.response?.data?.message || "Authentication failed"
      );
    }
  }
);

export const apiLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await instance.post("/auth/logout");
      clearAuthHeader();
      removeToken();
      removeUser();
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);
