import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/favoriteUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal'};

const favoriteSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    
    hideToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // If the item exists, update it and set isHidden to true
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...item, isHidden: true } : x
        );
      } else {
        // If the item doesn't exist, add it to favorites with isHidden set to true
        state.cartItems = [...state.cartItems, { ...item, isHidden: true }];
      }

      return updateCart(state);
    },

    
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },

    removeHiddenFromCart: (state) => {
      state.cartItems = state.cartItems.filter((x) => !x.isHidden);
      console.log("Cart state after removing hidden items:", state.cartItems);

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },
    
},
});


export const { addToCart, removeFromCart, saveShippingAddress,savePaymentMethod, 
  clearCartItems, hideToCart, removeHiddenFromCart} = favoriteSlice.actions;

  export const selectHiddenItemsCount = (state) =>
  state.cart.cartItems.filter((item) => item.isHidden).length;

  export const selectFavoritesCount = (state) =>
  state.cart.cartItems.filter((item) => !item.isHidden).length;



export default favoriteSlice.reducer;