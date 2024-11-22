import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Game } from "../types";

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

export const fetchAllGames = createAsyncThunk<
  FetchGamesResponse,
  void,
  { rejectValue: FetchGamesError }
>("games/fetchGames", async (_, thunkAPI) => {
  const BASE_URL = "https://virtual-headsets-store-api.onrender.com";
  const END_POINT = "/games";
  const url = BASE_URL + END_POINT;
  try {
    const response = await axios.get<ApiResponse>(url);
    return response.data.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const fetchTop5Games = createAsyncThunk<
  Game[],
  void,
  { rejectValue: FetchGamesError }
>("top5Games/fetchTop5Games", async (_, thunkAPI) => {
  const BASE_URL = "https://virtual-headsets-store-api.onrender.com";
  const END_POINT = "/games/top5";
  const url = BASE_URL + END_POINT;
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});
