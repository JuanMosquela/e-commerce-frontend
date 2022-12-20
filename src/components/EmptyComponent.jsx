import { BsBagDash } from "react-icons/bs";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

const EmptyComponent = ({ title }) => {
  return (
    <div className="empty-cart-container">
      <div className="empty-cart-wrapper">
        <h2>{title}</h2>
        <BsBagDash className="bag" />
        <Link to="/" className="button-wrapper">
          <HiOutlineArrowNarrowLeft className="icon" />
          <p>Go back</p>
        </Link>
      </div>
    </div>
  );
};
export default EmptyComponent;
