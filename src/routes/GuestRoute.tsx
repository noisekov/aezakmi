import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../store/hooks";
import { selectIsAuthenticated } from "../store/selectors";

const GuestRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return isAuthenticated ? <Navigate to="/cards" replace /> : <Outlet />;
};

export default GuestRoute;
