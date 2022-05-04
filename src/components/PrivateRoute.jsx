import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts";

const PrivateRoute = () => {
  const { user } = useAuth().state;
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
