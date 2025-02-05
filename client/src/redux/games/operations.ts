import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { Game } from "../types";

interface ExtendedRequestConfig extends InternalAxiosRequestConfig {
  metadata?: {
    startTime: number;
  };
}

interface ApiResponse {
  data: {
    data: Game[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
}
export type FetchGamesResponse = Game[];

type FetchGamesError = string;

const CACHE_DURATION = 30 * 60 * 1000;

const BASE_URL = "https://virtual-headsets-store-api.onrender.com";
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  (config as ExtendedRequestConfig).metadata = { startTime: performance.now() };
  return config;
});

api.interceptors.response.use((response: AxiosResponse) => {
  const config = response.config as ExtendedRequestConfig;
  const startTime = config.metadata?.startTime;

  if (startTime) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`Request to ${config.url} took ${duration}ms`);
  }
  return response;
});

export const fetchAllGames = createAsyncThunk<
  FetchGamesResponse,
  void,
  { rejectValue: FetchGamesError }
>("games/fetchGames", async (_, thunkAPI) => {
  try {
    const cachedData = localStorage.getItem("allGames");
    const cacheTime = localStorage.getItem("allGamesCacheTime");

    if (cachedData && cacheTime) {
      const cacheAge = Date.now() - Number(cacheTime);
      if (cacheAge < CACHE_DURATION) {
        return JSON.parse(cachedData);
      }
    }

    const response = await api.get<ApiResponse>("/games");
    const games = response.data.data.data;

    localStorage.setItem("allGames", JSON.stringify(games));
    localStorage.setItem("allGamesCacheTime", Date.now().toString());

    return games;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const fetchTop5Games = createAsyncThunk<
  Game[],
  void,
  { rejectValue: FetchGamesError }
>("top5Games/fetchTop5Games", async (_, thunkAPI) => {
  try {
    const cachedData = localStorage.getItem("top5Games");
    const cacheTime = localStorage.getItem("top5GamesCacheTime");

    if (cachedData && cacheTime) {
      const cacheAge = Date.now() - Number(cacheTime);
      if (cacheAge < CACHE_DURATION) {
        return JSON.parse(cachedData);
      }
    }

    const response = await api.get("/games/top5");
    const games = response.data.data;

    localStorage.setItem("top5Games", JSON.stringify(games));
    localStorage.setItem("top5GamesCacheTime", Date.now().toString());

    return games;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});
