import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AdminRoutes from "./Routes/AdminRoutes";
import ManagerRoutes from "./Routes/ManagerRoutes";
import UserRoutes from "./Routes/AppRoutes";
import AppRoutes from "./Routes/AppRoutes";

const App: React.FC = () => {
  return (
    <Router>
      <AdminRoutes />
      <AppRoutes />
      <ManagerRoutes />
      <UserRoutes />
    </Router>
  );
};

export default App;
