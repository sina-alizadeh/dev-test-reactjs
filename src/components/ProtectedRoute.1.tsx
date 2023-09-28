import { FC, useEffect, useState } from "react";
import { getItem } from "../core/services/storage/storage";
import { Route, redirect } from "react-router-dom";
import { IProtectedRouteProps } from "./ProtectedRoute";

const ProtectedRoute: FC<IProtectedRouteProps> = ({ element, path }) => {
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  useEffect(() => {
    const token = getItem("token");
    if (token) {
      setHasAccess(true);
    } else {
      redirect("/login");
    }
  }, []);

  return <>{hasAccess && <Route />}</>;
};
