import { useQuery } from "@apollo/client";
import React from "react";
import { useSelector } from "react-redux";
import { GET_SPECIFIC_PRODUCT } from "../../components/GrapghQL/Queries";
import "./CartItem.scss";
import CounterPageComponent from "./CounterPage/CounterPage";
const CartItem = ({ id, attributes: attributesProp, quantity }) => {
  const currencyC = useSelector((state) => state.currency.currency);
  const currencySign = useSelector((state) => state.currency.currencySign);
  const getNeededPrice = (prices) => {
    if (!prices) {
      return "";
    }
    return `${currencySign}${(
      prices.find((e) => e.currency.label === currencyC)?.amount * quantity
    ).toFixed(2)}`;
  };
  const { error, loading, data } = useQuery(GET_SPECIFIC_PRODUCT, {
    variables: {
      id,
    },
  });
  return (
    <>
      <hr />
      <div className="cart-item-wrapper">
        <div className="cart-item-content">
          <p className="cp-product-name">{data?.product.name}</p>
          <p className="cp-product-name" style={{ fontWeight: "400" }}>
            {data?.product.category}
          </p>
          <p className="cp-price">{getNeededPrice(data?.product?.prices)}</p>
          {data?.product.attributes.map((a) => {
            switch (a.name) {
              case "Color":
                return (
                  <>
                    <p className="product-property-title">{a.name}:</p>
                    <div className="items-wrapper">
                      {a.items.map((item) => (
                        <button
                          className="cart-color-item"
                          key={item.id}
                          style={{
                            backgroundColor: item.value,
                            border:
                              item.value === attributesProp?.[a.name]
                                ? "3px solid #5ece7b"
                                : "",
                          }}
                        ></button>
                      ))}
                    </div>
                  </>
                );
              default:
                return (
                  <>
                    <p className="product-property-title">{a.name}:</p>
                    <div className="items-wrapper">
                      {a.items.map((item) => (
                        <button
                          className="cart-size-item"
                          key={item.id}
                          style={{
                            background:
                              item.value === attributesProp?.[a.name]
                                ? "#121212"
                                : "",
                            color:
                              item.value === attributesProp?.[a.name]
                                ? "#fff"
                                : "",
                          }}
                        >
                          {item.value}
                        </button>
                      ))}
                    </div>
                  </>
                );
            }
          })}
        </div>
        <div className="spacer"></div>
        <div className="right-elements-wrapper">
          <div className="counter-wrapper">
            <CounterPageComponent
              id={id}
              quantity={quantity}
              attributes={attributesProp}
            />
          </div>
          <div className="cart-item-image-wrapper">
            <img
              className="cp-image"
              src={data?.product.gallery[0]}
              alt="ProductImage"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
