import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import "./CartPage.scss";
const CartPage = () => {
  const cart = useSelector((state) =>
    state.cart.cart.reduce((p, c) => p + c.quantity, 0)
  );
  const products = useSelector((state) => state.cart.cart);
  const currencyC = useSelector((state) => state.currency.currency);
  const currencySign = useSelector((state) => state.currency.currencySign);
  const getNeededPrice = (prices, q) => {
    if (!prices) {
      return "";
    }
    return prices.find((e) => e.currency.label === currencyC)?.amount * q;
  };
  return (
    <div className="menu-wrapper">
      <h1 className="menu-title-cart">Cart</h1>
      {products.map((e) => (
        <CartItem id={e.id} attributes={e.attributes} quantity={e.quantity} />
      ))}
      <hr />
      <p className="p-summury">
        Tax 21%:{" "}
        <strong>
          {currencySign}
          {(
            (products.reduce(
              (acc, c) => (acc += getNeededPrice(c.prices, c.quantity)),
              0
            ) /
              100) *
            21
          ).toFixed(2)}
        </strong>
      </p>
      <p className="p-summury">
        Quantity: <strong>{cart}</strong>
      </p>
      <p className="p-summury">
        Total:{" "}
        <strong>
          {currencySign}
          {products
            .reduce(
              (acc, c) => (acc += getNeededPrice(c.prices, c.quantity)),
              0
            )
            .toFixed(2)}
        </strong>
      </p>
      <button className="order-button">Order</button>
    </div>
  );
};

export default CartPage;
