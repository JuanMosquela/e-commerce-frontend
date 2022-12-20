import { useEffect, useState } from "react";

import {
  MdOutlineKeyboardArrowRight,
  MdOutlineLogin,
  MdOutlineLogout,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSliceRedux";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";

import { BsPersonFill, BsBagCheck } from "react-icons/bs";
import "../input.css";
import notFound from "../img/not-found.jpg";
import { useRef } from "react";

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const menu = useRef();

  const handleLogout = (e) => {
    e.stopPropagation();
    dispatch(logout());

    setIsOpen(false);
  };

  const handleLogIn = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleOutsideClicks = (e) => {
      if (isOpen && menu?.current && !menu?.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClicks);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClicks);
    };
  }, [isOpen]);

  return (
    <div className="relative hover:cursor-pointer " ref={menu}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-orange gap-2"
      >
        <AiOutlineUser className="text-slate text-3xl" />
      </div>

      <ul
        className={`dropdown-menu group/item ${isOpen ? "active" : "inactive"}`}
      >
        {user && (
          <div className="flex items-center w-full  mb-6 gap-4 pb-3 border-b border-b-slate/40">
            <img
              className="w-[30px] h-[30px] rounded-full "
              src={user.user.picture ? user.user.picture : notFound}
              alt={`profile of ${user?.user?.name}`}
            />
            <h5 className="text-slate text-sm font-semibold capitalize">
              {user.user.name}
            </h5>
          </div>
        )}

        <li className="flex justify-between items-center w-full my-3 group/list ">
          <Link
            className="flex gap-4 items-center  hover:cursor-pointer hover:text-orange  "
            to="/profile"
          >
            <BsPersonFill className="text-2xl bg-gray/50 text-slate rounded-full p-1 " />{" "}
            <p className="text-sm text-slate font-thin hover:text-slate/90">
              Edit Profile
            </p>
          </Link>
          <MdOutlineKeyboardArrowRight className="hidden group-hover/list:block text-xl font-thin text-slate/90" />
        </li>
        <li className="flex justify-between items-center w-full my-3 group/list">
          <Link
            className="flex gap-4 items-center  hover:cursor-pointer  "
            to="/user-products"
          >
            <BsBagCheck className="text-2xl bg-gray/50 text-slate rounded-full p-1 " />{" "}
            <p className="text-sm text-slate font-thin  hover:text-slate/90">
              Products
            </p>
          </Link>
          <MdOutlineKeyboardArrowRight className="hidden group-hover/list:block text-xl font-thin text-slate  " />
        </li>
        <li className="flex justify-between items-center w-full my-3 group/list">
          <Link
            className="flex gap-4 items-center  hover:cursor-pointer hover:text-orange  "
            to="/wishList"
          >
            <AiOutlineHeart className="text-2xl bg-gray/50 text-slate rounded-full p-1 " />{" "}
            <p className="text-sm text-slate font-thin hover:text-slate/90">
              WishList
            </p>
          </Link>
          <MdOutlineKeyboardArrowRight className="hidden group-hover/list:block text-xl font-thin text-slate/90" />
        </li>
        {user?.token ? (
          <li
            className="flex justify-between items-center w-full my-3 group/list"
            onClick={handleLogout}
          >
            <Link
              className="flex gap-4 items-center hover:cursor-pointer hover:text-orange-500    "
              to=""
            >
              <MdOutlineLogout className="text-2xl bg-gray/50 text-slate rounded-full p-1" />
              <p className="text-sm text-slate font-thin hover:text-slate/90">
                Logout
              </p>
            </Link>
            <MdOutlineKeyboardArrowRight className="hidden group-hover/list:block text-xl font-thin text-slate/90" />
          </li>
        ) : (
          <li
            className="flex justify-between items-center w-full my-3 group/list"
            onClick={handleLogIn}
          >
            <Link
              className="flex gap-4 items-center  hover:cursor-pointer hover:text-orange-500  "
              to="/login"
            >
              <MdOutlineLogin className="text-2xl bg-gray/50 text-slate rounded-full p-1" />
              <p className="text-sm text-slate font-thin hover:text-slate/90">
                Login
              </p>
            </Link>
            <MdOutlineKeyboardArrowRight className="hidden group-hover/list:block text-xl font-thin text-slate/90" />
          </li>
        )}
      </ul>
    </div>
  );
};
export default DropDownMenu;
