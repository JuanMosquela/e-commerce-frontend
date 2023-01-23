 import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

import DropDownMenu from "./DropDownMenu";

import WishList from "./WishList";
import Search from "./Search";

const Navbar = () => {
  return (
    <header className="w-full z-50 top-0 bg-white  ">
      <div className="md:container flex justify-between items-center py-2   ">
        <Link
          className=" py-1  font-black uppercase text-sm md:text-md lg:text-xl text-dark   "
          to="/"
        >
          <span className="text-orange text-xl">physical </span>
          point
        </Link>

        <Search />

        <div className="flex justify-center items-center gap-8">
          <WishList />
          <CartWidget />
          <DropDownMenu />
        </div>
      </div>
      <nav className=" bg-dark ">
        <ul className="md:container flex py-2 gap-8   ">
          <Link
            className="text-white/80 hover:text-white  md:block text-lg  capitalize font-thin "
            to="/"
          >
            home
          </Link>
          <Link
            className="text-white/80 hover:text-white  md:block text-lg  capitalize font-thin "
            to="/products"
          >
            shop
          </Link>
          <Link
            className="text-white/80 hover:text-white  md:block text-lg  capitalize font-thin "
            to="/about"
          >
            about us
          </Link>
          <Link
            className="text-white/80 hover:text-white  md:block text-lg  capitalize font-thin "
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
