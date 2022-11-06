import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  removeItem,
  decrese,
  useCartSelector,
  increse,
  reloadCart,
  clearCart,
} from "../redux/shoppingCartRedux";
import { Link } from "react-router-dom";
import EmpyCart from "../components/EmptyCart";

const CartList = () => {
  const { cart, totalPrice } = useSelector(useCartSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reloadCart());
  }, [cart]);

  const handleRemove = (product) => {
    dispatch(removeItem(product));
  };

  const handleDecrese = (product) => {
    dispatch(decrese(product));
  };
  const handleIncrece = (product) => {
    dispatch(increse(product));
  };

  return (
    <section className="cart-container">
      {cart.length === 0 ? (
        <EmpyCart />
      ) : (
        <>
          <div className="title-wrapper">
            <h3>Product</h3>
            <h3>Amount</h3>
            <h3>Quantity</h3>
            <h3>Price</h3>
          </div>

          {cart.map((product) => (
            <div className="cart-item" key={product.id}>
              <div className="item-info">
                <img src={product.pictureURL[0]} alt={product.title} />
                <div>
                  <h4>{product.title}</h4>
                  <h5>{product.category}</h5>
                  <button onClick={() => handleRemove(product)}>Remove</button>
                </div>
              </div>
              <span>$ {product.price}</span>
              <div className="button-group">
                <span onClick={() => handleDecrese(product)}>-</span>
                <span>{product.amount}</span>
                <span onClick={() => handleIncrece(product)}>+</span>
              </div>
              <span>$ {(product.price * product.amount).toFixed(3)}</span>
            </div>
          ))}
          <div className="cart-summary">
            <button
              className="clear-cart"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="checkout-info">
                <h3>Subtotal:</h3>
                <span>$ {totalPrice.toFixed(3)}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>

              <Link to="/success">
                <button className="checkout-button">Check out</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
export default CartList;
