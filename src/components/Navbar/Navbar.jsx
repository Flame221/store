import React, { useState } from "react";
import "./Navbar.scss";

import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import CurrencyButton from "./Currency/CurrencyButton";
import CartButton from "./Cart/CartButton";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logoHandle = () => {
    navigate("/");
  };
  return (
    <nav>
      <ul>
        <li className={location.pathname === "/" ? "active-item" : "item"}>
          <Link to="/">All</Link>
        </li>
        <li className="item">
          <Link to="/clothes">Clothes</Link>
        </li>
        <li className="item">
          <Link to="/tech">Tech</Link>
        </li>
      </ul>
      <div className="logo-wrapper" onClick={logoHandle}>
        <img src={logo} className="nav-logo" alt="logo" />
      </div>
      <div className="right-icons">
        <CurrencyButton />
        <CartButton />
      </div>
    </nav>
  );
};

export default Navbar;
