import React, { useEffect, useRef, useState } from "react";
import {
  BsCurrencyDollar,
  BsCurrencyEuro,
  BsCurrencyYen,
} from "react-icons/bs";
import { BiEuro } from "react-icons/bi";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import "./CurrencyButton.scss";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import CurrencyOption from "./CurrencyOption";
import { GET_CURRENCIES } from "../../GrapghQL/Queries";
import { useQuery } from "@apollo/client";

const DropDownMenu = ({ refProp, data }) => (
  <div
    ref={refProp}
    className="menu-currency"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="menu-button"
    tabIndex="-1"
  >
    <div className="wrapper-currency" role="none">
      {data.map((e) => {
        return (
          <CurrencyOption
            key={e.label}
            sign={e.symbol}
            label={e.label}
          ></CurrencyOption>
        );
      })}
    </div>
  </div>
);

const CurrencyButton = () => {
  const { error, loading, data } = useQuery(GET_CURRENCIES);

  const ref = useRef();
  useOnClickOutside(ref, () => setIsOpenCurrency(false));
  const [isOpenCurrency, setIsOpenCurrency] = useState(false);
  const showCurrencyHandler = () => setIsOpenCurrency((p) => !p);
  return (
    <div className="currency-wrapper">
      <button className="btn-icon" onClick={showCurrencyHandler}>
        <BsCurrencyDollar size="20px" />
        {isOpenCurrency ? <MdOutlineExpandMore /> : <MdOutlineExpandLess />}
      </button>
      {isOpenCurrency ? (
        <DropDownMenu refProp={ref} data={data.currencies} />
      ) : null}
    </div>
  );
};

export default CurrencyButton;
