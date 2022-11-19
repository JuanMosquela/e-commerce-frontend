import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCartSelector } from "../redux/shoppingCartRedux";

const CartWidget = () => {
  const state = useSelector(useCartSelector);

  return (
    <Link to="/cartList" className="text-slate-900  text-4xl relative">
      <AiOutlineShoppingCart />
      <span className="absolute flex justify-center items-center text-white bg-orange h-[25px] w-[25px] rounded-full text-sm p-2 top-[-5px] right-[-15px]   ">
        {state.quantity}
      </span>
    </Link>
  );
};
export default CartWidget;
