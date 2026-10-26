import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../store/hooks";
import { selectIsAuthenticated } from "../store/selectors";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
