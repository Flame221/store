import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_PRODUCTS } from "../components/GrapghQL/Queries";
import ProductsGrid from "../components/ProductsGrid/ProductsGrid";
import "./MenuStyles.scss";
const AllCategories = () => {
  const { error, loading, data } = useQuery(GET_ALL_PRODUCTS);
  return (
    <div className="menu-wrapper">
      <h1 className="menu-title">All</h1>
      <ProductsGrid data={data?.category?.products} />
    </div>
  );
};

export default AllCategories;
