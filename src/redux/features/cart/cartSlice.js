import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
        existingItem.rentalPeriod = action.payload.rentalPeriod || existingItem.rentalPeriod;
        alert("Item added to cart");
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
          rentalPeriod: action.payload.rentalPeriod || 1,
        });
        alert("Item added to cart");
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload.id
      );
    },

updateCartItem: (state, action) => {
  const index = state.cartItems.findIndex(
    (item) => item._id === action.payload.id
  );

  if (index >= 0) {
    state.cartItems[index] = {
      ...state.cartItems[index],
      ...action.payload,
    };
  }
},

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
