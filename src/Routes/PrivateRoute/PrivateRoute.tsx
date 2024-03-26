import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface User {
  // Define the structure of your user object here
  // For example:
  id: string;
  email: string;
  // Add more fields as needed
}

interface PrivateRouteProps {
  children: ReactNode;
  user: User | null; // Specify a more specific type for the user prop
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, user }) => {
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
