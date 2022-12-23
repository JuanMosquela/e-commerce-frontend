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
import EmptyComponent from "../components/EmptyComponent";

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
    <section className="flex-col justify-center min-h-screen  bg-white container">
      {cart.length === 0 ? (
        <EmptyComponent title="Your cart it's empty" />
      ) : (
        <>
          <div className="grid grid-cols-4 text-center border-b-2 border-gray/50 text-lg text-slate font-bold uppercase pb-2">
            <h3>Product</h3>
            <h3>Amount</h3>
            <h3>Quantity</h3>
            <h3>Price</h3>
          </div>

          {cart.map((product) => (
            <div
              className="grid grid-cols-4 text-center items-center justify-center border-b-2 border-gray/50 py-4 "
              key={product._id}
            >
              <div className="flex text-left gap-4">
                <img
                  className="h-[150px] w-[90px] object-contain"
                  src={product.pictureURL[0]}
                  alt={product.title}
                />
                <div>
                  <h4 className="text-slate pt-4 font-semibold text-md  ">
                    {product.title}
                  </h4>
                  <h5 className="text-slate mt-2 text-sm mb-2 ">
                    {product.category}
                  </h5>
                  <button
                    className="py-2 px-1 bg-gray rounded-sm text-white text-sm cursor-pointer  "
                    onClick={() => handleRemove(product)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <span className="text-sm text-slate ">$ {product.price}</span>
              <div className="cursor-pointer border-2 border-orange px-4 py-2 flex justify-between w-[200px] mx-auto rounded-md bg-slate/10 slate">
                <span
                  className="text-[1.2rem] "
                  onClick={() => handleDecrese(product)}
                >
                  -
                </span>
                <span className="text-[1.2rem]  ">{product.amount}</span>
                <span
                  className="text-[1.2rem]  "
                  onClick={() => handleIncrece(product)}
                >
                  +
                </span>
              </div>
              <span>$ {(product.price * product.amount).toFixed(3)}</span>
            </div>
          ))}
          <div className="flex justify-between flex-wrap gap-2 items-center mt-4">
            <button
              className="text-slate border-2 border-gray bg-white text-sm rounded-sm px-4 py-1 cursor-pointer"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="flex justify-between w-64 mb-4 items-center">
                <h3 className="text-slate text-md font-semibold">Subtotal:</h3>
                <span className="text-slate text-[1.4rem] font-semibold">
                  $ {totalPrice.toFixed(3)}
                </span>
              </div>
              <p className="text-slate mb-4 font-thin text-sm">
                Taxes and shipping calculated at checkout
              </p>

              <Link to="/success">
                <button className="flex justify-center bg-orange text-white font-bold px-3 py-3 rounded-md uppercase cursor-pointer w-full shadow-md ">
                  Check out
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
export default CartList;
