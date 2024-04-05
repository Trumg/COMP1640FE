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
import StudentPostManagementPage from "./Pages/StudentPage/StudentPostManagementPage";

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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Main */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/admin/profile"
          element={<AdminProfilePage />}
          // role="ADMIN"
        />
        <Route
          path="/admin/academic-year-management"
          element={<AdminAcademicYearManagementPage />}
          // role="ADMIN"
        />
        <Route
          path="/admin/faculty-management"
          element={<AdminFacultyManagementPage />}
          // role="ADMIN"
        />
        <Route
          path="/admin/closure-date-management"
          element={<AdminClosureDateManagement />}
          // role="ADMIN"
        />
        <Route
          path="/admin/dashboard"
          element={<AdminDashboardPage />}
          // role="ADMIN"
        />

        {/* Manager Routes */}
        <Route path="/manager" element={<ManagerPage />} />
        <Route
          path="/manager/profile"
          element={<ManagerProfilePage />}
          // role="MANAGER"
        />
        <Route
          path="/manager/dashboard"
          element={<ManagerDashboardPage />}
          // role="MANAGER"
        />

        {/* Coordinator Routes */}
        <Route
          path="/coordinator"
          element={<CoordinatorPage />}
          // role="COORDINATOR"
        />
        <Route
          path="/coordinator/profile"
          element={<CoordinatorProfilePage />}
          // role="COORDINATOR"
        />
        <Route
          path="/coordinator/dashboard"
          element={<CoordinatorDashboardPage />}
          // role="COORDINATOR"
        />

        {/* Student Routes */}
        <Route path="/student" element={<StudentPage />} />
        <Route
          path="/student/profile"
          element={<StudentProfilePage />}
          // role="STUDENT"
        />
        <Route
          path="/student/post-management"
          element={<StudentPostManagementPage />}
          // role="STUDENT"
        />
        <Route
          path="/student/dashboard"
          element={<StudentDashboardPage />}
          // role="STUDENT"
        />

        {/* Terms & Conditions */}
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
