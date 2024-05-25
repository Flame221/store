import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_SPECIFIC_PRODUCT } from "../../components/GrapghQL/Queries";
import { addToCart } from "../../redux/CounterSlice/cartSlice";
import Loader from "../../utils/Loader/Loader";
import "./ProductPage.scss";

const ProductPage = () => {
  const { productid } = useParams();
  const { error, loading, data } = useQuery(GET_SPECIFIC_PRODUCT, {
    variables: {
      id: productid,
    },
  });
  const [mainImg, setMainImg] = useState();
  const [attributes, setAttributes] = useState({});
  const dispatch = useDispatch();
  const currencyC = useSelector((state) => state.currency.currency);
  const currencySign = useSelector((state) => state.currency.currencySign);
  useEffect(() => {
    setMainImg(data?.product.gallery[0]);
  }, [data]);
  const getNeededPrice = (prices) => {
    if (!prices) {
      return "";
    }
    return `${currencySign}${
      prices.find((e) => e.currency.label === currencyC)?.amount
    }`;
  };
  const handleAddToCart = (dataA, prices) => {
    if (
      !dataA.every((e) => Object.keys(attributes).some((key) => e.name === key))
    ) {
      return;
    }
    const p = {
      id: productid,
      attributes: attributes,
      prices: prices,
    };
    dispatch(addToCart(p));
  };
  return (
    <div className="product-page">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="gallery">
            {data?.product.gallery.map((src, i) => {
              return (
                <img
                  onClick={() => setMainImg(data?.product.gallery[i])}
                  className="gallery-img"
                  key={src}
                  loading="lazy"
                  alt="ProductImage"
                  src={src}
                  style={{
                    border: src === mainImg ? "1px solid" : "",
                  }}
                />
              );
            })}
          </div>
          <div className="main-photo">
            <Zoom>
              <img className="main-img" alt="ProductImage" src={mainImg} />
            </Zoom>
          </div>
          <div className="product-content">
            <h1 className="product-name">{data?.product.name}</h1>
            <p className="product-category">{data?.product.category}</p>
            {data?.product.attributes?.name ? (
              <>
                <p className="product-property-title">
                  {data?.product.attributes.size.name}
                </p>
              </>
            ) : (
              ""
            )}
            {data?.product.attributes.map((a) => {
              switch (a.name) {
                case "Color":
                  return (
                    <>
                      <p className="product-property-title">{a.name}</p>
                      <div className="items-wrapper">
                        {a.items.map((item) => (
                          <button
                            onClick={() => {
                              setAttributes({
                                ...attributes,
                                [a.name]: item.value,
                              });
                            }}
                            className="color-item"
                            key={item.id}
                            style={{
                              backgroundColor: item.value,
                              border:
                                item.value === attributes?.[a.name]
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
                      <p className="product-property-title">{a.name}</p>
                      <div className="items-wrapper">
                        {a.items.map((item) => (
                          <button
                            onClick={() => {
                              setAttributes((prev) => ({
                                ...prev,
                                [a.name]: item.value,
                              }));
                            }}
                            className="size-item"
                            key={item.id}
                            style={{
                              background:
                                item.value === attributes?.[a.name]
                                  ? "#121212"
                                  : "",
                              color:
                                item.value === attributes?.[a.name]
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
            <p className="product-property-title">Price: </p>
            <p className="product-price">
              {getNeededPrice(data?.product?.prices)}
            </p>
            <button
              onClick={() =>
                handleAddToCart(data?.product.attributes, data?.product.prices)
              }
              className="product-addtocart-button"
            >
              Add to cart
            </button>
            
          </div>
          <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: data?.product.description }}
            ></div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
