import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCartSelector } from "../redux/shoppingCartRedux";

const CartWidget = () => {
  const state = useSelector(useCartSelector);

  return (
    <Link to="/cartList" className="text-white text-5xl relative">
      <AiOutlineShoppingCart />
      <span className="absolute flex justify-center items-center bg-orange-400 h-[25px] w-[25px] rounded-full text-xl p-2 top-[-5px] right-[-15px]   ">
        {state.quantity}
      </span>
    </Link>
  );
};
export default CartWidget;
