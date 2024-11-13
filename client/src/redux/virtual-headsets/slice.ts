import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  virtualHeadsets: [],
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

export const sliceVirtualHeadsets = createSlice({
  name: "VirtualHeadsets",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload: userData }) => {
        state.isLoading = false;
        state.error = null;
        state.items = userData;
      })
      .addCase(fetchData.pending, handlePending)
      .addCase(fetchData.rejected, handleRejected);
  },
});

export default sliceVirtualHeadsets.reducer;
