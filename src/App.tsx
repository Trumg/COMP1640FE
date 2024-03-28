import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import GuestRoute from "./Routes/GuestRoute/GuestRoute";
import AuthRoute from "./Routes/AuthRoute/AuthRoute";
import UserRoute from "./Routes/UserRoute/UserRoute";
import AdminRoute from "./Routes/AdminRoute/AdminRoute";
import ManagerRoute from "./Routes/ManagerRoute/ManagerRoute";

const App: React.FC = () => {
  return (
    <Router>
      <GuestRoute />
      <AuthRoute />
      <UserRoute />
      <AdminRoute />
      <ManagerRoute />
    </Router>
  );
};

export default App;
