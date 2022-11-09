import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCartSelector } from "../redux/shoppingCartRedux";

const CartWidget = () => {
  const state = useSelector(useCartSelector);

  return (
    <Link to="cartList" className="cart-icon">
      <AiOutlineShoppingCart />
      <span>{state.quantity}</span>
    </Link>
  );
};
export default CartWidget;
