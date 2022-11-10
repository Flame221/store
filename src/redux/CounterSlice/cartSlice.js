import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart"))
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.attributes) ===
            JSON.stringify(action.payload.attributes)
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.attributes) ===
            JSON.stringify(action.payload.attributes)
      );
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.attributes) ===
            JSON.stringify(action.payload.attributes)
      );
      if (item.quantity === 1) {
        const removeItem = state.cart.filter(
          (item) =>
            item.id !== action.payload.id &&
            JSON.stringify(item.attributes) !==
              JSON.stringify(action.payload.attributes)
        );
        state.cart = removeItem;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removeItem;
    },
  },
});
export default cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;
