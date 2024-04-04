import React from "react";
import { Route, Routes } from "react-router-dom";
import UserPostPage from "../../Pages/UserPage/UserPostPage/UserPostPage";

const UserRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/post" element={<UserPostPage />} />
    </Routes>
  );
};

export default UserRoute;
