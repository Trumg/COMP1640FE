import React from "react";
import { BrowserRouter } from "react-router-dom";

import AdminRoutes from "./Routes/AdminRoutes/AdminRoutes";
import AuthRoutes from "./Routes/AuthRoutes/AuthRoutes";
import CoordinatorRoutes from "./Routes/CoordinatorRoutes/CoordinatorRoutes";
import GuestRoutes from "./Routes/GuestRoutes/GuestRoutes";
import ManagerRoutes from "./Routes/ManagerRoutes/ManagerRoutes";
import StudentRoutes from "./Routes/StudentRoutes/StudentRoutes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AdminRoutes />
      <AuthRoutes />
      <CoordinatorRoutes />
      <GuestRoutes />
      <ManagerRoutes />
      <StudentRoutes />
    </BrowserRouter>
  );
};

export default App;
