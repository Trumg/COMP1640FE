import React from "react";
import { Route, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  element,
  isAuthenticated,
}) => {
  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="auth/login" />
  );
};

export default PrivateRoute;
