import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSliceRedux";

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.stopPropagation();
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <div className="dropdown-menu" onClick={() => setIsOpen((prev) => !prev)}>
      <FaUserCircle style={{ color: "#FFF", fontSize: "3.5rem" }} />
      {isOpen && (
        <ul className="drop-down">
          <li>
            <Link to="/profile">
              <CgProfile /> Profile
            </Link>
          </li>

          <li onClick={handleLogout}>
            <Link to="">
              <MdOutlineLogout />
              Logout
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default DropDownMenu;
