import { useDispatch } from "react-redux";

import { removeItem } from "../redux/shoppingCartRedux";
import { Link } from "react-router-dom";

import EmptyComponent from "../components/EmptyComponent";
import {
  useClearCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../redux/api/productsApi";

import CounterButton from "../components/CounterButton";

const CartList = () => {
  const { data, isLoading, error } = useGetCartQuery();

  const [clearCart] = useClearCartMutation();

  console.log(data?.result);

  const dispatch = useDispatch();

  const [removeFromCart] = useRemoveFromCartMutation();

  return (
    <section className="flex-col justify-center min-h-screen  bg-white md:container pt-10">
      {data?.result?.items?.length === 0 ? (
        <EmptyComponent title="Your cart it's empty" />
      ) : (
        <>
          <div className="grid grid-cols-4 text-center border-b border-slate/50 text-lg text-dark font-bold uppercase pb-2">
            <h3>Product</h3>
            <h3>Amount</h3>
            <h3>Quantity</h3>
            <h3>Price</h3>
          </div>

          {data?.result?.items.map((product) => (
            <div
              className="grid grid-cols-4 text-center items-center justify-center border-b border-slate/50 py-4 "
              key={product?._id}
            >
              <div className="flex text-left gap-4">
                <img
                  className="h-[150px] w-[90px] object-contain"
                  src={product?.item.pictureURL[0]}
                  alt={product?.item.title}
                />
                <div>
                  <h4 className="text-dark pt-4 font-semibold text-md  ">
                    {product?.item.title}
                  </h4>
                  <h5 className="text-slate mt-2 text-sm mb-2 ">
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
              <span className="text-sm text-slate ">{product?.quantity}</span>
              <CounterButton product={product} />

              <span>$ {(product?.total).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between flex-wrap gap-2 items-center mt-4">
            <button
              className="text-slate border-2 border-gray bg-white text-sm rounded-sm px-4 py-1 cursor-pointer"
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="flex justify-between w-64 mb-4 items-center">
                <h3 className="text-dark text-xl font-bold">Subtotal:</h3>
                <span className="text-dark text-[1.5rem] font-bold">
                  $ {data?.result?.subTotal.toFixed(2)}
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
