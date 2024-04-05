import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth Page
import LoginPage from "./Pages/LoginPage/LoginPage";
import ResetPage from "./Pages/LoginPage/ResetPage";

// Admin Page
import AdminPage from "./Pages/AdminPage/AdminPage";
import AdminPostManagementPage from "./Pages/AdminPage/AdminPostManagementPage";
import AdminUserManagementPage from "./Pages/AdminPage/AdminUserManagementPage";
import AdminProfilePage from "./Pages/AdminPage/AdminProfilePage";
import AdminSettingsPage from "./Pages/AdminPage/AdminSettingsPage";
import AdminAcademicYearManagementPage from "./Pages/AdminPage/AdminAcademicYearManagementPage";

// Student Page
import StudentPage from "./Pages/StudentPage/StudentPage";
import StudentPostManagementPage from "./Pages/StudentPage/StudentPostManagement";
import StudentPostStatusPage from "./Pages/StudentPage/StudentPostStatusPage";
import StudentProfilePage from "./Pages/StudentPage/StudentProfilePage";
import StudentSettingsPage from "./Pages/StudentPage/StudentSettingsPage";

// Coordinator Page
import CoordinatorPage from "./Pages/CoordinatorPage/CoordinatorPage";

// Manager Page
import ManagerPage from "./Pages/ManagerPage/ManagerPage";
import TermsConditionsPage from "./Pages/TermsConditionsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/profile" element={<AdminProfilePage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
        <Route
          path="/admin/post-management"
          element={<AdminPostManagementPage />}
        />
        <Route
          path="/admin/user-management"
          element={<AdminUserManagementPage />}
        />
        <Route
          path="/admin/academic-year-management"
          element={<AdminAcademicYearManagementPage />}
        />

        {/* Manager */}
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/manage/profile" />
        <Route path="/manage/settings" />

        {/* Coordinator */}
        <Route path="/coordinator" element={<CoordinatorPage />} />
        <Route path="/coordinator/profile" />
        <Route path="/coordinator/settings" />
        <Route path="/coordinator/faculty-management" />

        {/* Student */}
        <Route path="/student" element={<StudentPage />} />
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
        <Route path="/student/profile" element={<StudentProfilePage />} />
        <Route path="/student/settings" element={<StudentSettingsPage />} />
        <Route
          path="/student/post-management"
          element={<StudentPostManagementPage />}
        />
        <Route
          path="/student/post-status"
          element={<StudentPostStatusPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
