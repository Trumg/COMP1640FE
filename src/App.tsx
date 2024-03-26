import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import GuestRoute from "./Routes/GuestRoute/GuestRoute";
import AdminRoute from "./Routes/AdminRoute/AdminRoute";
import ManagerRoute from "./Routes/ManagerRoute/ManagerRoute";
import UserRoute from "./Routes/UserRoute/UserRoute";

const App: React.FC = () => {
  return (
    <Router>
      <GuestRoute />
      <AdminRoute />
      <ManagerRoute />
      <UserRoute />
    </Router>
  );
};

export default App;
