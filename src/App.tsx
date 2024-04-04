import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage/LoginPage";
import ManagerPage from "./Pages/ManagerPage/ManagerPage";
import CoordinatorPage from "./Pages/CoordinatorPage/CoordinatorPage";

import AdminPage from "./Pages/AdminPage/AdminPage";
import AdminPostManagementPage from "./Pages/AdminPage/AdminPostManagementPage";
import AdminUserManagementPage from "./Pages/AdminPage/AdminUserManagementPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/admin/post-management"
          element={<AdminPostManagementPage />}
        />
        <Route
          path="/admin/user-management"
          element={<AdminUserManagementPage />}
        />

        {/* Manager */}
        <Route path="/manager" element={<ManagerPage />} />

        {/* Coordinator */}
        <Route path="/coordinator" element={<CoordinatorPage />} />
        <Route path="/coordinator/faculty" />

        {/* Student */}
        <Route path="/student" element={<CoordinatorPage />} />
        <Route path="/student/post" />
      </Routes>
    </Router>
  );
};

export default App;
