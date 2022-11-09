import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";

const DropDownMenu = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = (e) => {
    e.stopPropagation();
    logout();
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

          <li onClick={(e) => handleLogout(e)}>
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
