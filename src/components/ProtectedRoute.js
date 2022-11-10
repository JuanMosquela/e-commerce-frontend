import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  console.log(auth.token);

  return auth.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
