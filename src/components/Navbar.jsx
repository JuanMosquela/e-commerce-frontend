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
    <header className="bg-teal-700">
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
            onChange={(e) => handleInput(e.target.value)}
          />
          <BiSearch
            className="search-icon"
            onClick={() => handleClick(inputValue)}
          />
        </div>

        <Box
          sx={{
            display: "flex",
            gap: 3,
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

          <DropDownMenu />
          <CartWidget />
        </Box>
      </div>
    </header>
  );
};
export default Navbar;
