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
import { logout } from "../redux/authSliceRedux";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { GoogleContext } from "../context/GoogleProvider";
import { BsPersonFill } from "react-icons/bs";

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userLogin);
  const { googleUser, setGoogleUser } = useContext(GoogleContext);

  const handleLogout = (e) => {
    e.stopPropagation();
    dispatch(logout());
    setGoogleUser(null);
    setIsOpen(false);
  };

  const handleLogIn = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="relative hover:cursor-pointer "
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="flex items-center text-white gap-2">
        {/* {user ? <p>{`${user.name}`}</p> : null} */}
        {googleUser ? (
          <img
            className="w-[50px] rounded-full"
            src={googleUser?.user?.picture}
            alt="profilePicture"
          />
        ) : (
          <AiOutlineUser className="text-slate text-3xl" />
        )}
      </div>
      {isOpen && (
        <ul className="absolute top-[50px] right-[-25px] w-[260px] px-6 py-2 bg-white rounded-sm z-40 shadow-lg ">
          {googleUser && (
            <div className="flex items-center gap-4 border-b-2  border-gray/50 pb-2 ">
              <img
                className="w-[30px] rounded-full "
                src={googleUser?.user?.picture}
                alt="profilePicture"
              />
              <h4 className="text-sm font-semibold text-slate">
                {googleUser?.user?.name}
              </h4>
            </div>
          )}
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
              to="/profile"
            >
              <AiOutlineHeart className="text-2xl bg-gray/50 text-slate rounded-full p-1 " />{" "}
              <p className="text-sm text-slate font-thin">My WishList</p>
            </Link>
            <MdOutlineKeyboardArrowRight className="text-xl font-thin text-slate/90" />
          </li>
          {user || googleUser ? (
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
