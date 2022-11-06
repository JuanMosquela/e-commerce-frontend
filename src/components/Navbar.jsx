import { Box } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import { useState } from "react";

import { removeFromFav, useCartSelector } from "../redux/shoppingCartRedux";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);

  const { favProducts } = useSelector(useCartSelector);

  const [inputValue, setInputValue] = useState("");

  return (
    <header>
      <div className="header-wrapper">
        <Link className="logo" to="/">
          physical point
        </Link>

        <div className="input-container">
          <input
            className="filter-input"
            type="text"
            value={inputValue}
            placeholder="Search products by name"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <BiSearch className="search-icon" />
        </div>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <nav>
            <ul>
              <Link to="/">home</Link>
              <Link to="/productos">shop</Link>
            </ul>
          </nav>

          <CartWidget />
        </Box>
      </div>
    </header>
  );
};
export default Navbar;
