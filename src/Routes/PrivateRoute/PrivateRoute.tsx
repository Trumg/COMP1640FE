import React from "react";
import { Route, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  path: string;
  isAuthenticated: boolean;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  isAuthenticated,
  element,
}) => {
  return (
    <Route
      path={path}
      element={isAuthenticated ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
