import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";

interface AuthResponse {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

interface RegisterFormData {
  email: string;
  password: string;
  name: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface RootState {
  auth: {
    token: string | null;
  };
}

export const instance: AxiosInstance = axios.create({
  baseURL: "https://virtual-headsets-store-api.onrender.com",
});

const setAuthHeaders = (token: string): void => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const apiRegister = createAsyncThunk<
  AuthResponse,
  RegisterFormData,
  {
    rejectValue: string;
  }
>("auth/register", async (formData, thunkApi) => {
  try {
    const { data } = await instance.post<AuthResponse>(
      "/auth/register",
      formData
    );
    setAuthHeaders(data.token);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue("An unknown error occurred");
  }
});

export const apiLogin = createAsyncThunk<
  AuthResponse,
  LoginFormData,
  {
    rejectValue: string;
  }
>("auth/login", async (formData, thunkApi) => {
  try {
    const { data } = await instance.post<AuthResponse>("/auth/login", formData);
    setAuthHeaders(data.token);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue("An unknown error occurred");
  }
});

export const refreshPage = createAsyncThunk<
  AuthResponse,
  void,
  {
    rejectValue: string;
    state: RootState;
  }
>(
  "auth/refresh",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      setAuthHeaders(token || "");
      const { data } = await instance.get<AuthResponse>("/auth/refresh");
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("An unknown error occurred");
    }
  },
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const token = state.auth.token;

      if (token) return true;
      return false;
    },
  }
);

export const apiLogout = createAsyncThunk<
  void,
  void,
  {
    rejectValue: string;
  }
>("auth/logout", async (_, thunkApi) => {
  try {
    await instance.post("/auth/logout");
    setAuthHeaders("");
    return;
  } catch (error) {
    if (error instanceof Error) {
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue("An unknown error occurred");
  }
});
