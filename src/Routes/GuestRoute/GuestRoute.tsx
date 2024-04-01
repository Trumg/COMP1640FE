import React from "react";
import { Route, Routes } from "react-router-dom";

import GuestPage from "../../Pages/GuestPage/GuestPage";
import UserPage from "../../Pages/UserPage/UserPage";
import { useGetInfoUser } from "../../Hooks/useToken";

const GuestRoute: React.FC = () => {
  const infoUser = useGetInfoUser();

  return (
    <Routes>
      <Route path="/" element={infoUser ? <UserPage /> : <GuestPage />} />
    </Routes>
  );
};

export default GuestRoute;
