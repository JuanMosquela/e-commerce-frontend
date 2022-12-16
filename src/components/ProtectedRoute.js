import { useContext } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { GoogleContext } from "../context/GoogleProvider";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
