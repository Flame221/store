import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./CounterSlice/cartSlice";
import currencySlice from "./CounterSlice/currencySlice";

const handleSubscribe = () => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart.cart));
  localStorage.setItem("currency", JSON.stringify(store.getState().currency));
  console.log(store.getState().currency);
};

export const store = configureStore({
  reducer: {
    currency: currencySlice,
    cart: cartSlice,
  },
});
store.subscribe(handleSubscribe);
