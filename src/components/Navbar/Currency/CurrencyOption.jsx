import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrency } from "../../../redux/CounterSlice/currencySlice";
const CurrencyOption = ({ sign, label }) => {
  const currencyC = useSelector((state) => state.currency.currency);
  const dispatch = useDispatch();
  const handleChangeCurrency = () => {
    dispatch(changeCurrency({ label: label, symbol: sign }));
  };
  return (
    <button
      href="#"
      className="currency-item"
      role="menuitem"
      tabIndex="-1"
      id="menu-item-0"
      onClick={handleChangeCurrency}
      style={{ backgroundColor: label === currencyC ? "#eeeeee" : "" }}
    >
      {sign} {label}
    </button>
  );
};

export default CurrencyOption;
