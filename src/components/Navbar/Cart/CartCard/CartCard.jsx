import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { GET_SPECIFIC_PRODUCT } from "../../../GrapghQL/Queries";
import CounterComponent from "../CounerCoponent/CounterComponent";
import "./CartCard.scss";
const CartCard = ({ id, atrs, prices, quantity }) => {
  const currencyC = useSelector((state) => state.currency.currency);
  const currencySign = useSelector((state) => state.currency.currencySign);

  const getNeededPrice = (prices, q) => {
    if (!prices) {
      return "";
    }
    return `${currencySign}${(
      prices.find((e) => e.currency.label === currencyC)?.amount * q
    ).toFixed(2)}`;
  };
  const { error, loading, data } = useQuery(GET_SPECIFIC_PRODUCT, {
    variables: {
      id,
    },
  });

  return (
    <div className="cc-wrapper">
      <div className="cc-content">
        <p className="cc-product-name">{data?.product.name}</p>
        <p className="cc-product-name">{data?.product.category}</p>
        <p className="cc-price">{getNeededPrice(prices, quantity)}</p>
        {data?.product.attributes.map((a) => {
          switch (a.name) {
            case "Color":
              return (
                <>
                  <p className="cc-product-property-title">{a.name}</p>
                  <div className="items-wrapper">
                    {a.items.map((item) => (
                      <button
                        className="cc-color-item"
                        key={item.id}
                        style={{
                          backgroundColor: item.value,
                          border:
                            item.value === atrs?.[a.name]
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
                  <p className="cc-product-property-title">{a.name}</p>
                  <div className="items-wrapper">
                    {a.items.map((item) => (
                      <button
                        className="cc-size-item"
                        key={item.id}
                        style={{
                          background:
                            item.value === atrs?.[a.name] ? "#121212" : "",
                          color: item.value === atrs?.[a.name] ? "#fff" : "",
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
      <div className="cc-counter">
        <CounterComponent quantity={quantity} id={id} attributes={atrs} />
      </div>
      <div className="cc-image">
        <img
          className="cc-image"
          src={data?.product.gallery[0]}
          alt="ProductImage"
        />
      </div>
    </div>
  );
};

export default CartCard;
