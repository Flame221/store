import { useQuery } from "@apollo/client";
import React from "react";
import { GET_CLOTHES_PRODUCTS } from "../components/GrapghQL/Queries";
import ProductsGrid from "../components/ProductsGrid/ProductsGrid";
import "./MenuStyles.scss";
const ClothesCategory = () => {
  const { error, loading, data } = useQuery(GET_CLOTHES_PRODUCTS);
  return (
    <div className="menu-wrapper">
      <h1 className="menu-title">Clothes</h1>
      <ProductsGrid data={data?.category?.products} />
    </div>
  );
};

export default ClothesCategory;
