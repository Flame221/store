import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.scss";
const ErrorPage = () => {
  return (
    <div className="error-page-wrapper">
      <div className="backhome-button">
        <Link to="/">Home</Link>
      </div>
      <h1>This page doesn't exist :(</h1>
    </div>
  );
};

export default ErrorPage;
