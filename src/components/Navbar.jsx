import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import { useContext, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { ProductsContext } from "../context/SearchProductsProvider";

import { FaUserCircle } from "react-icons/fa";
import DropDownMenu from "./DropDownMenu";
import { AiOutlineHeart } from "react-icons/ai";
import WishList from "./WishList";
import Search from "./Search";

const Navbar = () => {
  const { handleClick, inputValue, handleInput } = useContext(ProductsContext);

  return (
    <header className="w-full z-50 top-0 bg-white  ">
      <div className="container flex justify-between items-center py-2   ">
        <Link
          className=" py-1  font-bold uppercase text-sm md:text-md lg:text-xl text-black  "
          to="/"
        >
          <span className="text-orange text-xl font-bold">physical </span>
          point
        </Link>

        <Search />

        <div className="flex justify-center items-center gap-8">
          <WishList />
          <CartWidget />
          <DropDownMenu />
        </div>
      </div>
      <nav className="m-right bg-dark ">
        <ul className="container flex justify gap-8 py-2">
          <Link
            className="text-white/80 hover:text-white hidden md:block text-lg  capitalize font-thin "
            to="/"
          >
            home
          </Link>
          <Link
            className="text-white/80 hover:text-white hidden md:block text-lg  capitalize font-thin "
            to="/products"
          >
            shop
          </Link>
          <Link
            className="text-white/80 hover:text-white hidden md:block text-lg  capitalize font-thin "
            to="/about"
          >
            about us
          </Link>
          <Link
            className="text-white/80 hover:text-white hidden md:block text-lg  capitalize font-thin "
            to="/contact"
          >
            contact us
          </Link>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
