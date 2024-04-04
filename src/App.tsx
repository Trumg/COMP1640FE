import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage/LoginPage";
import ManagerPage from "./Pages/ManagerPage/ManagerPage";
import CoordinatorPage from "./Pages/CoordinatorPage/CoordinatorPage";

import AdminPage from "./Pages/AdminPage/AdminPage";
import AdminDashboardPage from "./Pages/AdminPage/AdminDashboardPage";
import AdminManagementPage from "./Pages/AdminPage/AdminManagementPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/dashboard/statistic" />
        <Route path="/admin/dashboard/statistic/user" />
        <Route path="/admin/dashboard/statistic/post" />
        <Route path="/admin/dashboard/statistic/academic-year" />
        <Route path="/admin/management" element={<AdminManagementPage />} />
        <Route path="/admin/management/post" />
        <Route path="/admin/management/user" />

        {/* Manager */}
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/manager/profile" />
        <Route path="/manager/settings" />
        <Route path="/manager/dashboard" />
        <Route path="/manager/management" />

        {/* Coordinator */}
        <Route path="/coordinator" element={<CoordinatorPage />} />
        <Route path="/coordinator/profile" />
        <Route path="/coordinator/settings" />
        <Route path="/coordinator/dashboard" />
        <Route path="/coordinator/management" />
        <Route path="/coordinator/management/faculty" />

        {/* Student */}
        <Route path="/student" element={<CoordinatorPage />} />
        <Route path="/student/profile" />
        <Route path="/student/settings" />
        <Route path="/student/management" />
        <Route path="/student/management/post" />
      </Routes>
    </Router>
  );
};

export default App;
