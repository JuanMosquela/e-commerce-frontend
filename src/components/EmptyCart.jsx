import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BsBagDash } from "react-icons/bs";
import { Link } from "react-router-dom";

const EmpyCart = () => {
  return (
    <div className="empty-cart-container">
      <div className="empty-cart-wrapper">
        <h2>Your bag it´s empty</h2>
        <BsBagDash className="bag" />
        <Link to="/" className="button-wrapper">
          <HiOutlineArrowNarrowLeft className="icon" />
          <p>Go back shopping</p>
        </Link>
      </div>
    </div>
  );
};
export default EmpyCart;
