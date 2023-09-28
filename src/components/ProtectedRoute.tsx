import { FC } from "react";
import { Navigate } from "react-router-dom";

interface IProtectedRouteProps {
  hasToken: boolean;
  children: JSX.Element;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ hasToken, children }) => {
  return <>{hasToken ? children : <Navigate to={"/login"} />}</>;
};

export { ProtectedRoute };
