import React from "react";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
} from "../../../../redux/CounterSlice/cartSlice";
import "./CounterComponent.scss";
const CounterComponent = ({ quantity, id, attributes }) => {
  const dispatch = useDispatch();
  const handleInc = () => {
    dispatch(incrementQuantity({ id, attributes }));
  };
  const handleDec = () => {
    dispatch(decrementQuantity({ id, attributes }));
  };

  return (
    <div className="counter-container">
      <button className="counter-action" onClick={handleInc}>
        +
      </button>
      <div className="spacer">{quantity}</div>
      <button className="counter-action" onClick={handleDec}>
        -
      </button>
    </div>
  );
};

export default CounterComponent;
