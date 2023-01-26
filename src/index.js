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

import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import About from "./pages/About";
import Contact from "./pages/Contact";

import WishListPage from "./pages/WishListPage";
import Profile from "./pages/Profile";
import CreateProduct from "./pages/CreateProduct";
import ProfileEdit from "./pages/ProfileEdit";
import MyProducts from "./pages/MyProducts";
import UserProductView from "./pages/UserProductView";
import ScrollToTop from "./components/ScrollToTop";

import Success from "./pages/Success";
import Orders from "./pages/Orders";
import Checkoutv1 from "./pages/Checkoutv1";
import Checkoutv2 from "./pages/Checkoutv2";
import Checkout from "./pages/Checkout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ScrollToTop />

      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<App />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<User />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/cartList" element={<CartList />} />
            <Route path="/wishList" element={<WishListPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile-edit" element={<ProfileEdit />} />
            <Route path="/user-products" element={<MyProducts />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route
              path="user-products/view/:id"
              element={<UserProductView />}
            />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkoutv1" element={<Checkoutv1 />} />
          <Route path="/checkoutv2" element={<Checkoutv2 />} />
          <Route path="/success" element={<Success />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
