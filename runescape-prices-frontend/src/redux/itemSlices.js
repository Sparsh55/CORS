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
    handlePriceFilter: (state, action) => {
      const { minPrice, maxPrice } = action.payload;
      state.items = state.items.filter((item) => item.price >= minPrice && item.price <= maxPrice);
    },
    handleSort: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      console.log(sortBy, sortOrder);
      console.log(state.items);
      const sortedItems = state.items.sort((a, b) => {
        // console.log(a,b);
        if (sortOrder === 'asc') {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      });
      console.log(sortedItems);
    },
  },
});

export const { setItems, updateItems, setPrices, updatePrices, setCurrentPage, handlePriceFilter, handleSort } = itemsSlice.actions;
export default itemsSlice.reducer;
