// src/redux/slices/pricesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPrices = createAsyncThunk('prices/fetchPrices', async () => {
  const response = await axios.get('http://localhost:8000/prices');
  return response.data;
});

const pricesSlice = createSlice({
  name: 'prices',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export default pricesSlice.reducer;
