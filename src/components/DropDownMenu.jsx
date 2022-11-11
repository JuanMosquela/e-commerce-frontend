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
  const auth = useSelector((state) => state.auth);

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
        {auth.token && <p>{`Welcome ${auth.token.name}`}</p>}
        <FaUserCircle style={{ color: "#FFF", fontSize: "3.5rem" }} />
      </div>
      {isOpen && (
        <ul className="drop-down">
          <li>
            <Link to="/profile">
              <CgProfile /> Profile
            </Link>
          </li>
          {auth.token ? (
            <li onClick={handleLogout}>
              <Link to="">
                <MdOutlineLogout />
                Logout
              </Link>
            </li>
          ) : (
            <li onClick={handleLogIn}>
              <Link to="/login">
                <MdOutlineLogin />
                LogIn
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
export default DropDownMenu;
