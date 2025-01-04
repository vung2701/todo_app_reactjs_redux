import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false, 
  },
  reducers: {
    loading: (state) => {
      state.isLoading = true;
    },
    unLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { loading, unLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
