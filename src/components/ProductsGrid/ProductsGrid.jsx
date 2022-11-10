import React from "react";
import { useSelector } from "react-redux";
import CardComponent from "../CardComponent/CardComponent";
import "./ProductsGrid.scss";
const ProductsGrid = ({ data }) => {
  const currencyC = useSelector((state) => state.currency.currency);
  const currencySign = useSelector((state) => state.currency.currencySign);
  const getNeededPrice = (prices) => {
    return `${currencySign}${
      prices.find((e) => e.currency.label === currencyC)?.amount
    }`;
  };
  return (
    <div className="pgrid">
      {data
        ? data.map((p) => (
            <CardComponent
              id={p.id}
              key={p.id}
              name={p.name}
              pimage={p.gallery[0]}
              price={getNeededPrice(p.prices)}
            />
          ))
        : null}
    </div>
  );
};

export default ProductsGrid;
