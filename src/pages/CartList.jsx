import { useDispatch, useSelector } from "react-redux";

import { removeItem } from "../redux/shoppingCartRedux";
import { Link } from "react-router-dom";

import {
  useClearCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../redux/api/productsApi";

import CounterButton from "../components/CounterButton";
import { CircularProgress } from "@mui/material";
import { BsBagX } from "react-icons/bs";
import TitleComponent from "../components/TitleComponent";

const CartList = () => {
  const { data, error, isLoading } = useGetCartQuery();

  const [clearCart] = useClearCartMutation();

  const [removeFromCart] = useRemoveFromCartMutation();

  return (
    <section className="min-height  md:container  mb-10">
      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center">
          <CircularProgress sx={{ color: "var(--color-orange)" }} size="5rem" />
        </div>
      ) : data?.result?.items?.length === 0 || !data ? (
        <TitleComponent
          title="Your cart it´s empty"
          text="Start buying products to see your cart bag"
          icon={<BsBagX />}
          status={false}
        />
      ) : (
        <div className="  flex-col justify-center">
          <div className="hidden md:grid grid-cols-4 text-center border-b border-slate/50 text-lg text-dark font-bold uppercase pb-2">
            <h3>Product</h3>
            <h3>Amount</h3>
            <h3>Quantity</h3>
            <h3>Price</h3>
          </div>

          {data?.result?.items.map((product) => (
            <div
              className="grid grid-cols-2 md:grid-cols-4 text-center items-center justify-center border-b border-slate/50 py-4 "
              key={product?._id}
            >
              <div className="flex md:text-left gap-4 col-span-2 md:col-span-1 ">
                <img
                  className="h-[150px] w-[90px] object-contain flex-1"
                  src={product?.item.pictureURL[0]}
                  alt={product?.item.title}
                />
                <div className="flex-1 text-left">
                  <h4 className="text-dark pt-4 font-semibold text-md  ">
                    {product?.item.title}
                  </h4>
                  <h5 className="text-dark mt-2 text-sm mb-2 capitalize ">
                    {product?.item.category}
                  </h5>
                  <button
                    className="py-2 px-1 bg-gray rounded-sm text-dark text-sm cursor-pointer  "
                    onClick={() => removeFromCart(product?.item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <span className="text-lg text-dark ">x {product?.quantity}</span>
              <CounterButton product={product} />

              <span className="text-lg text-dark  font-bold">
                $ {(product?.total).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex justify-between flex-wrap gap-6 md:gap-2 items-center mt-4 p-4">
            <button
              className="text-slate border border-slate bg-white text-lg rounded-sm px-4 py-1 cursor-pointer font-thin"
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
            <div className="w-full md:w-fit">
              <div className="flex justify-between w-64 mb-4 items-center">
                <h3 className="text-dark text-xl font-bold">Subtotal:</h3>
                <span className="text-dark text-xl font-bold">
                  $ {data?.result?.subTotal.toFixed(2)}
                </span>
              </div>
              <p className="text-slate mb-4 font-thin text-sm">
                Taxes and shipping calculated at checkout
              </p>

              <Link to="/checkout">
                <button className="flex justify-center bg-orange text-white font-bold px-3 py-3 rounded-md uppercase cursor-pointer w-full hover:shadow-lg hover:duration-150 ">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default CartList;
