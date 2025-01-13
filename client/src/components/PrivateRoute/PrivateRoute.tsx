import { ReactNode } from "react";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/hooks";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

  return isLoggedIn ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
