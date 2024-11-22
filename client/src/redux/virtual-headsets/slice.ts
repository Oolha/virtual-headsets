import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VRHeadset } from "../types";
import { fetchAllVrHeadsets } from "./operations";

interface VRHeadsetState {
  virtualHeadsets: VRHeadset[];
  isLoading: boolean;
  error: string | null;
}
const initialState: VRHeadsetState = {
  virtualHeadsets: [],
  isLoading: false,
  error: null,
};

const handlePending = (state: VRHeadsetState) => {
  state.isLoading = true;
  state.error = null;
};
const handleRejected = (
  state: VRHeadsetState,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload || "An error occurred";
};

export const sliceVirtualHeadsets = createSlice({
  name: "virtualHeadsets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAllVrHeadsets.fulfilled,
        (state, action: PayloadAction<VRHeadset[]>) => {
          state.isLoading = false;
          state.error = null;
          state.virtualHeadsets = action.payload;
        }
      )
      .addCase(fetchAllVrHeadsets.pending, handlePending)
      .addCase(fetchAllVrHeadsets.rejected, handleRejected);
  },
});

export default sliceVirtualHeadsets.reducer;
