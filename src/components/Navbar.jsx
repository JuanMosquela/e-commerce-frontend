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
    <header className="bg-black w-full fixed z-50 top-0 py-3 ">
      <div className="container flex justify-between items-center   ">
        <Link
          className="border-4 border-orange-500  px-4 py-1  font-bold uppercase text-sm md:text-md lg:text-xl text-white  "
          to="/"
        >
          physical point
        </Link>

        <div className="flex justify-center items-center gap-8">
          <nav className="navbar">
            <ul className="flex gap-8">
              <Link
                className="text-white/80 hover:text-white hidden md:block text-xl capitalize font-semibold "
                to="/"
              >
                home
              </Link>
              <Link
                className="text-white/80 hover:text-white hidden md:block text-xl capitalize font-semibold "
                to="/products"
              >
                shop
              </Link>
            </ul>
          </nav>

          <CartWidget />
          <DropDownMenu />
        </div>
      </div>
    </header>
  );
};
export default Navbar;
