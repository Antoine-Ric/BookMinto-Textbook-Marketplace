import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProduct: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const { setSelectedProduct, clearSelectedProduct } = checkoutSlice.actions;

export default checkoutSlice.reducer;
