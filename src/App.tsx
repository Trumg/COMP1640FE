import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage/LoginPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import ManagerPage from "./Pages/ManagerPage/ManagerPage";
import CoordinatorPage from "./Pages/CoordinatorPage/CoordinatorPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Manager */}
        <Route path="/manager" element={<ManagerPage />} />

        {/* Coordinator */}
        <Route path="/coordinator" element={<CoordinatorPage />} />

        {/* Student */}
        <Route path="/student" element={<CoordinatorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
