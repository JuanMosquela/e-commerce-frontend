import { useContext } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { GoogleContext } from "../context/GoogleProvider";

const ProtectedRoute = () => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.userLogin);
  const { googleUser } = useContext(GoogleContext);

  return user?.token || googleUser?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
