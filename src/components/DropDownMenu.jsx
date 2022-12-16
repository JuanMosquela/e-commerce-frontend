import { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineLogin,
  MdOutlineLogout,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSliceRedux";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { GoogleContext } from "../context/GoogleProvider";
import { BsPersonFill, BsBagCheck } from "react-icons/bs";

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    e.stopPropagation();
    dispatch(logout());

    setIsOpen(false);
  };

  const handleLogIn = (e) => {
    e.stopPropagation();
  };

  console.log(user);

  return (
    <div
      className="relative hover:cursor-pointer "
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="flex items-center text-white gap-2">
        <AiOutlineUser className="text-slate text-3xl" />
      </div>
      {isOpen && (
        <ul className="absolute top-[50px] right-[-25px] w-[260px] px-6 py-2 bg-white rounded-sm z-40 shadow-lg ">
          <li className="flex justify-between items-center w-full my-3">
            <Link
              className="flex gap-4 items-center  hover:cursor-pointer hover:text-orange  "
              to="/profile"
            >
              <BsPersonFill className="text-2xl bg-gray/50 text-slate rounded-full p-1 " />{" "}
              <p className="text-sm text-slate font-thin">Edit Profile</p>
            </Link>
            <MdOutlineKeyboardArrowRight className="text-xl font-thin text-slate/90" />
          </li>
          <li className="flex justify-between items-center w-full my-3">
            <Link
              className="flex gap-4 items-center  hover:cursor-pointer hover:text-orange  "
              to="/product-create"
            >
              <BsBagCheck className="text-2xl bg-gray/50 text-slate rounded-full p-1 " />{" "}
              <p className="text-sm text-slate font-thin">Publish Product</p>
            </Link>
            <MdOutlineKeyboardArrowRight className="text-xl font-thin text-slate/90" />
          </li>
          <li className="flex justify-between items-center w-full my-3">
            <Link
              className="flex gap-4 items-center  hover:cursor-pointer hover:text-orange  "
              to="/wishList"
            >
              <AiOutlineHeart className="text-2xl bg-gray/50 text-slate rounded-full p-1 " />{" "}
              <p className="text-sm text-slate font-thin">My WishList</p>
            </Link>
            <MdOutlineKeyboardArrowRight className="text-xl font-thin text-slate/90" />
          </li>
          {user?.token ? (
            <li
              className="flex justify-between items-center w-full my-3"
              onClick={handleLogout}
            >
              <Link
                className="flex gap-4 items-center hover:cursor-pointer hover:text-orange-500    "
                to=""
              >
                <MdOutlineLogout className="text-2xl bg-gray/50 text-slate rounded-full p-1" />
                <p className="text-sm text-slate font-thin">Logout</p>
              </Link>
              <MdOutlineKeyboardArrowRight className="text-xl font-thin text-slate/90" />
            </li>
          ) : (
            <li
              className="flex justify-between items-center w-full my-3"
              onClick={handleLogIn}
            >
              <Link
                className="flex gap-4 items-center  hover:cursor-pointer hover:text-orange-500  "
                to="/login"
              >
                <MdOutlineLogin className="text-2xl bg-gray/50 text-slate rounded-full p-1" />
                <p className="text-sm text-slate font-thin">Login</p>
              </Link>
              <MdOutlineKeyboardArrowRight className="text-xl font-thin text-slate/90" />
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
export default DropDownMenu;
