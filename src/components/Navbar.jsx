import { Box } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import { useState } from "react";

import { removeFromFav, useCartSelector } from "../redux/shoppingCartRedux";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);

  const { favProducts } = useSelector(useCartSelector);

  return (
    <header>
      <div className="header-wrapper">
        <Link className="logo" to="/">
          physical point
        </Link>

        <ul>
          <Link to="/">home</Link>
          <Link to="/productos">shop</Link>
        </ul>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div
            className="fav-container"
            onClick={() => setIsHovered((prev) => !prev)}
          >
            Favorites
            <IoIosArrowDown />
          </div>
          {isHovered && (
            <div className="fav-products-wrapper">
              <h4 className="title">Favorites</h4>
              {favProducts.map((product) => (
                <div className="fav-product">
                  <img src={product.pictureURL[0]} alt={product.title} />
                  <div className="content">
                    <h4>{product.title}</h4>
                    <h5>{product.price}</h5>
                    <button onClick={() => dispatch(removeFromFav(product))}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <CartWidget />
        </Box>
      </div>
    </header>
  );
};
export default Navbar;
