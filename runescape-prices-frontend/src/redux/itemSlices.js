// src/redux/itemsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    prices: [],
    currentPage: 1,
    itemsPerPage: 10,  // Change this as needed
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    updateItems: (state, action) => {
      state.items = action.payload;
    },
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    updatePrices: (state, action) => {
      state.prices = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setItems, updateItems, setPrices, updatePrices, setCurrentPage } = itemsSlice.actions;
export default itemsSlice.reducer;
