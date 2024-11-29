import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemSlices";
import pricesReducer from "./priceSlices";
const Store = configureStore({
  reducer: { items: itemsReducer, prices: pricesReducer },
});
export default Store;
