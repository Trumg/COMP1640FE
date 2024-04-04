import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AuthRoute from "./Routes/AuthRoute/AuthRoute";
import UserRoute from "./Routes/UserRoute/UserRoute";
import AdminRoute from "./Routes/AdminRoute/AdminRoute";
import ManagerRoute from "./Routes/ManagerRoute/ManagerRoute";
import CoordinatorRoute from "./Routes/CoordinatorRoute/CoordinatorRoute";

const App: React.FC = () => {
  return (
    <Router>
      <AuthRoute />
      <UserRoute />
      <AdminRoute />
      <ManagerRoute />
      <CoordinatorRoute />
    </Router>
  );
};

export default App;
