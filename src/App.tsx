import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import all the necessary pages/components
import LoginPage from "./Pages/LoginPage/LoginPage";
import ResetPage from "./Pages/LoginPage/ResetPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import AdminProfilePage from "./Pages/AdminPage/AdminProfilePage";
import AdminAcademicYearManagementPage from "./Pages/AdminPage/AdminAcademicYearManagementPage";
import AdminFacultyManagementPage from "./Pages/AdminPage/AdminFacultyManagementPage";
import AdminClosureDateManagement from "./Pages/AdminPage/AdminClosureDateManagement";
import AdminDashboardPage from "./Pages/AdminPage/AdminDashboardPage";
import StudentPage from "./Pages/StudentPage/StudentPage";
import StudentProfilePage from "./Pages/StudentPage/StudentProfilePage";
import StudentDashboardPage from "./Pages/StudentPage/StudentDashboardPage";
import StudentPostManagementPage from "./Pages/StudentPage/StudentPostManagementPage";
import CoordinatorPage from "./Pages/CoordinatorPage/CoordinatorPage";
import CoordinatorDashboardPage from "./Pages/CoordinatorPage/CoordinatorDashboardPage";
import CoordinatorProfilePage from "./Pages/CoordinatorPage/CoordinatorProfilePage";
import ManagerPage from "./Pages/ManagerPage/ManagerPage";
import ManagerDashboardPage from "./Pages/ManagerPage/ManagerDashboardPage";
import ManagerProfilePage from "./Pages/ManagerPage/ManagerProfilePage";
import TermsConditionsPage from "./Pages/TermsConditionsPage";

const App: React.FC = () => {
  // State to store the user's role
  const [userRole, setUserRole] = useState<string | null>(null);

  // Function to extract user role from JWT token
  useEffect(() => {
    // Fetch user role from JWT or session storage and set it to state
    const role = sessionStorage.getItem("userRole");
    if (role) {
      setUserRole(role);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Main routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPage />} />

        {/* Admin routes */}
        {userRole === "ADMIN" && (
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
        )}

        {/* Manager routes */}
        {userRole === "MANAGER" && (
          <>
            <Route path="/manager" element={<ManagerPage />} />
            <Route path="/manager/profile" element={<ManagerProfilePage />} />
            <Route
              path="/manager/dashboard"
              element={<ManagerDashboardPage />}
            />
          </>
        )}

        {/* Coordinator routes */}
        {userRole === "COORDINATOR" && (
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
        )}

        {/* Student routes */}
        {userRole === "STUDENT" && (
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
        )}

        {/* Terms & Conditions */}
        <Route path="/terms-conditions" element={<TermsConditionsPage />} />
      </Routes>
      {/* Redirect to login if user role is not set */}
      {userRole === null && <Navigate to="/" />}
    </Router>
  );
};

export default App;
