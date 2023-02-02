import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push({ ...action.payload});
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.referencia !== action.payload);
      state.cart = removeItem;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  removeItem,
} = cartSlice.actions;