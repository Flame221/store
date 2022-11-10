import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./CardComponent.scss";
const CardComponent = ({ id = "", name, pimage, price }) => {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/${id}`);
  };

  return (
    <div
      className="card-container"
      onClick={onClickHandler}
      onMouseEnter={() => {
        setShowButton(true);
      }}
      onMouseLeave={() => {
        setShowButton(false);
      }}
    >
      {showButton ? (
        <div className="cart-card-wrapper">
          <BsCart2 size={25} />
        </div>
      ) : null}

      <div className="card-img">
        <img className="card-img" alt="ProductImage" src={pimage} />
      </div>
      <div className="card-content">
        <p className="card-title">{name}</p>
        <p className="card-price">{price}</p>
      </div>
    </div>
  );
};

export default CardComponent;
