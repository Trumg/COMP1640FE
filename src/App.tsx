import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("Token");
    if (token) {
      const userRole = extractUserRole(token);
      setUserRole(userRole);
    }
  }, []);

  const extractUserRole = (jwtToken: string) => {
    const base64Url = jwtToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedData = JSON.parse(atob(base64));
    return decodedData[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];
  };

  return (
    <Router>
      <Routes>
        {/* Main */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPage />} />

        {/* Admin Routes */}
        {userRole === "ADMIN" ? (
          <>
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
          </>
        ) : null}

        {/* Manager Routes */}
        {userRole === "MANAGER" ? (
          <>
            <Route path="/manager" element={<ManagerPage />} />
            <Route path="/manager/profile" element={<ManagerProfilePage />} />
            <Route
              path="/manager/dashboard"
              element={<ManagerDashboardPage />}
            />
          </>
        ) : null}

        {/* Coordinator Routes */}
        {userRole === "COORDINATOR" ? (
          <>
            <Route path="/coordinator" element={<CoordinatorPage />} />
            <Route
              path="/coordinator/profile"
              element={<CoordinatorProfilePage />}
            />
            <Route
              path="/coordinator/dashboard"
              element={<CoordinatorDashboardPage />}
            />
          </>
        ) : null}

        {/* Student Routes */}
        {userRole === "STUDENT" ? (
          <>
            <Route path="/student" element={<StudentPage />} />
            <Route path="/student/profile" element={<StudentProfilePage />} />
            <Route
              path="/student/post-management"
              element={<StudentPostManagementPage />}
            />
            <Route
              path="/student/dashboard"
              element={<StudentDashboardPage />}
            />
          </>
        ) : null}

        {/* Terms & Conditions */}
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
      </Routes>
      {/* Redirect to login if user role is not set */}
      {userRole === null && <Navigate to="/" />}
    </Router>
  );
};

export default App;
