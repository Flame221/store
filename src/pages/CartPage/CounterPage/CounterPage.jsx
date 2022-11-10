import React from "react";
import "./CounterPage.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
} from "../../../redux/CounterSlice/cartSlice";
const CounterPageComponent = ({ id, quantity, attributes }) => {
  const dispatch = useDispatch();
  const handleInc = () => {
    dispatch(incrementQuantity({ id, attributes }));
  };
  const handleDec = () => {
    dispatch(decrementQuantity({ id, attributes }));
  };
  return (
    <div className="pcounter-container">
      <button className="pcounter-action" onClick={handleInc}>
        <AiOutlinePlus />
      </button>
      <div className="spacer">{quantity}</div>
      <button className="pcounter-action" onClick={handleDec}>
        <AiOutlineMinus />
      </button>
    </div>
  );
};

export default CounterPageComponent;
