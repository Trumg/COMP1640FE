import { User } from "firebase/auth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
  user?: User | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, user }) => {
  return user ? children : <Navigate to="/access-denied" />;
};

export default PrivateRoute;
