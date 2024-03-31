import React from "react";
import { Route, Routes } from "react-router-dom";

import StudentPage from "../../Pages/StudentPage/StudentPage";

const StudentRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/student" element={<StudentPage />} />
    </Routes>
  );
};

export default StudentRoute;
