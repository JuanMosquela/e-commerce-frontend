import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSliceRedux";
import { AiOutlineUser } from "react-icons/ai";

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userLogin);

  console.log(user);

  const handleLogout = (e) => {
    e.stopPropagation();
    dispatch(logout());
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
        <AiOutlineUser className="text-slate text-3xl" />
      </div>
      {isOpen && (
        <ul className="absolute top-[42px] right-[-15px] w-[200px] px-6 py-2 bg-white rounded-sm z-40 shadow-lg ">
          <li>
            <Link
              className="flex gap-6 items-center  hover:cursor-pointer hover:text-orange  "
              to="/profile"
            >
              <CgProfile /> <p>My Profile</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-6 items-center hover:cursor-pointer hover:text-orange-500    "
              to="/wishList"
            >
              <CgProfile /> <p>My WishList</p>
            </Link>
          </li>
          {user ? (
            <li onClick={handleLogout}>
              <Link
                className="flex gap-6 items-center hover:cursor-pointer hover:text-orange-500    "
                to=""
              >
                <MdOutlineLogout />
                <p>Logout</p>
              </Link>
            </li>
          ) : (
            <li onClick={handleLogIn}>
              <Link
                className="flex gap-6 items-center  hover:cursor-pointer hover:text-orange-500  "
                to="/login"
              >
                <MdOutlineLogin />
                <p>Login</p>
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
export default DropDownMenu;
