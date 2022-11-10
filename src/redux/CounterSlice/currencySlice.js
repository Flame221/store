import { createSlice } from "@reduxjs/toolkit";

const initialStateCurrent = {
  currency: "USD",
  currencySign: "$",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState: localStorage.getItem("currency")
    ? JSON.parse(localStorage.getItem("currency"))
    : initialStateCurrent,
  reducers: {
    changeCurrency: (state, action) => {
      state.currency = action.payload.label;
      state.currencySign = action.payload.symbol;
      // state.currencySign = getSymbolFromCurrency(action.payload);
    },
  },
});
export const { changeCurrency } = currencySlice.actions;

export default currencySlice.reducer;
