import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./pages/User";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CartList from "./pages/CartList";

import ProductDetailPage from "./pages/ProductDetailPage";
import SearchProductsProvider from "./context/SearchProductsProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <SearchProductsProvider>
        <Routes>
          <Route path="/" exact element={<App />}>
            <Route index element={<Home />} />
            <Route path="/users" element={<User />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cartList" element={<CartList />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </SearchProductsProvider>
    </Provider>
  </BrowserRouter>
);
