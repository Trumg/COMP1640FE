import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage/LoginPage";
import ManagerPage from "./Pages/ManagerPage/ManagerPage";
import CoordinatorPage from "./Pages/CoordinatorPage/CoordinatorPage";

import AdminPage from "./Pages/AdminPage/AdminPage";
import AdminPostManagementPage from "./Pages/AdminPage/AdminPostManagementPage";
import AdminUserManagementPage from "./Pages/AdminPage/AdminUserManagementPage";
import StudentPage from "./Pages/StudentPage/StudentPage";
import StudentPostManagementPage from "./Pages/StudentPage/StudentPostManagement";
import ResetPage from "./Pages/LoginPage/ResetPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPage />} />

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
        <Route path="/student" element={<StudentPage />} />
        <Route
          path="/student/post-management"
          element={<StudentPostManagementPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
