import { Navigate } from "react-router";
import { useAppSelector } from "../store/hooks";
import { selectIsAuthenticated } from "../store/selectors";

const HomeRedirect = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return <Navigate to={isAuthenticated ? "/cards" : "/login"} replace />;
};

export default HomeRedirect;
