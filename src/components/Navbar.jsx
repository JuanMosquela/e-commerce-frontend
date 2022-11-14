import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import { useContext, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { ProductsContext } from "../context/SearchProductsProvider";

import { FaUserCircle } from "react-icons/fa";
import DropDownMenu from "./DropDownMenu";

const Navbar = () => {
  const { handleClick, inputValue, handleInput } = useContext(ProductsContext);

  return (
    <header>
      <div className="header-wrapper">
        <Link className="logo" to="/">
          physical point
        </Link>

        <Box
          sx={{
            display: "flex",
            gap: 5,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <nav className="navbar">
            <ul>
              <Link to="/">home</Link>
              <Link to="/products">shop</Link>
            </ul>
          </nav>

          <CartWidget />
          <DropDownMenu />
        </Box>
      </div>
    </header>
  );
};
export default Navbar;
