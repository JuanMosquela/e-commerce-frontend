import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSliceRedux";

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
    <div className="dropdown-menu" onClick={() => setIsOpen((prev) => !prev)}>
      <div className="user-container">
        {user ? <p>{`${user.name}`}</p> : null}
        <FaUserCircle style={{ color: "#FFF", fontSize: "3.5rem" }} />
      </div>
      {isOpen && (
        <ul className="drop-down">
          <li>
            <Link to="/profile">
              <CgProfile /> <p>Profile</p>
            </Link>
          </li>
          {user ? (
            <li onClick={handleLogout}>
              <Link to="">
                <MdOutlineLogout />
                <p>Logout</p>
              </Link>
            </li>
          ) : (
            <li onClick={handleLogIn}>
              <Link to="/login">
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
