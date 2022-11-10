import { useQuery } from "@apollo/client";
import React from "react";
import { GET_TECH_PRODUCTS } from "../components/GrapghQL/Queries";
import ProductsGrid from "../components/ProductsGrid/ProductsGrid";
import "./MenuStyles.scss";
const TechCategory = () => {
  const { error, loading, data } = useQuery(GET_TECH_PRODUCTS);
  return (
    <div className="menu-wrapper">
      <h1 className="menu-title">Tech</h1>
      <ProductsGrid data={data?.category?.products} />
    </div>
  );
};

export default TechCategory;
