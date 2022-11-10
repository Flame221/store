import React, { useRef, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import "./CartButton.scss";
import CartCard from "./CartCard/CartCard";

const DropDownMenu = ({ refProp, len }) => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.cart.cart);
  const handleViewBag = () => {
    navigate("/cart");
  };
  const currencyC = useSelector((state) => state.currency.currency);
  const currencySign = useSelector((state) => state.currency.currencySign);
  const getNeededPrice = (prices, q) => {
    if (!prices) {
      return "";
    }
    return prices.find((e) => e.currency.label === currencyC)?.amount * q;
  };
  return (
    <div className="dropdown-container" ref={refProp}>
      <p>
        <span style={{ fontWeight: "normal" }}>My bag</span>, {len} items
      </p>
      {products.map((e) => (
        <CartCard
          id={e.id}
          atrs={e.attributes}
          prices={e.prices}
          quantity={e.quantity}
        />
      ))}
      <p>
        Total: {currencySign}
        {products
          .reduce((acc, c) => (acc += getNeededPrice(c.prices, c.quantity)), 0)
          .toFixed(2)}
      </p>
      <div className="action-buttons">
        <button onClick={handleViewBag} className="viewbag-btn">
          View Bag
        </button>
        <button onClick={handleViewBag} className="checkout-btn">
          Check Out
        </button>
      </div>
    </div>
  );
};

const CartButton = () => {
  const cart = useSelector((state) =>
    state.cart.cart.reduce((p, c) => p + c.quantity, 0)
  );
  const ref = useRef();
  useOnClickOutside(ref, () => setIsOpenCart(false));
  const [isOpenCart, setIsOpenCart] = useState(false);
  const showCartHandler = () => setIsOpenCart((p) => !p);
  return (
    <>
      <button className="btn-icon" onClick={showCartHandler}>
        <AiOutlineShoppingCart size="20px" />
        {cart ? (
          <span className="badge" id="lblCartCount">
            {cart}
          </span>
        ) : (
          ""
        )}
      </button>
      {isOpenCart ? <DropDownMenu len={cart} refProp={ref} /> : null}
    </>
  );
};

export default CartButton;
