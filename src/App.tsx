import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth Page
import LoginPage from "./Pages/LoginPage/LoginPage";
import ResetPage from "./Pages/LoginPage/ResetPage";

// Admin Page
import AdminPage from "./Pages/AdminPage/AdminPage";
import AdminProfilePage from "./Pages/AdminPage/AdminProfilePage";
import AdminAcademicYearManagementPage from "./Pages/AdminPage/AdminAcademicYearManagementPage";
import AdminFacultyManagementPage from "./Pages/AdminPage/AdminFacultyManagementPage";
import AdminClosureDateManagement from "./Pages/AdminPage/AdminClosureDateManagement";
import AdminDashboardPage from "./Pages/AdminPage/AdminDashboardPage";

// Student Page
import StudentPage from "./Pages/StudentPage/StudentPage";
import StudentProfilePage from "./Pages/StudentPage/StudentProfilePage";
import StudentDashboardPage from "./Pages/StudentPage/StudentDashboardPage";

// Coordinator Page
import CoordinatorPage from "./Pages/CoordinatorPage/CoordinatorPage";
import CoordinatorDashboardPage from "./Pages/CoordinatorPage/CoordinatorDashboardPage";
import CoordinatorProfilePage from "./Pages/CoordinatorPage/CoordinatorProfilePage";

// Manager Page
import ManagerPage from "./Pages/ManagerPage/ManagerPage";
import ManagerDashboardPage from "./Pages/ManagerPage/ManagerDashboardPage";
import ManagerProfilePage from "./Pages/ManagerPage/ManagerProfilePage";

// Terms & Conditions Page
import TermsConditionsPage from "./Pages/TermsConditionsPage";
import StudentPostManagementPage from "./Pages/StudentPage/StudentPostManagementPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Main */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/profile" element={<AdminProfilePage />} />
        <Route
          path="/admin/academic-year-management"
          element={<AdminAcademicYearManagementPage />}
        />
        <Route
          path="/admin/faculty-management"
          element={<AdminFacultyManagementPage />}
        />
        <Route
          path="/admin/closure-date-management"
          element={<AdminClosureDateManagement />}
        />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

        {/* Manager */}
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/manager/profile" element={<ManagerProfilePage />} />
        <Route path="/manager/dashboard" element={<ManagerDashboardPage />} />

        {/* Coordinator */}
        <Route path="/coordinator" element={<CoordinatorPage />} />
        <Route
          path="/coordinator/profile"
          element={<CoordinatorProfilePage />}
        />
        <Route
          path="/coordinator/dashboard"
          element={<CoordinatorDashboardPage />}
        />

        {/* Student */}
        <Route path="/student" element={<StudentPage />} />
        <Route path="/student/profile" element={<StudentProfilePage />} />
        <Route
          path="/student/post-management"
          element={<StudentPostManagementPage />}
        />
        <Route path="/student/dashboard" element={<StudentDashboardPage />} />

        {/* Terms & Conditions */}
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
