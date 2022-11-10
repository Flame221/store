import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import AllCategories from "./pages/AllCategories";
import ClothesCategory from "./pages/ClothesCategory";
import ErrorPage from "./pages/ErrorPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import TechCategory from "./pages/TechCategory";
import { Provider } from "react-redux";
import Root from "./Root";
import { store } from "./redux/store";
import CartPage from "./pages/CartPage/CartPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AllCategories />,
      },
      {
        path: "/clothes",
        element: <ClothesCategory />,
      },
      {
        path: "/tech",
        element: <TechCategory />,
      },
      {
        path: "/:productid",
        element: <ProductPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
