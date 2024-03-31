import React from "react";
import { Route, Routes } from "react-router-dom";

import GuestPage from "../../Pages/GuestPage/GuestPage";
import { useGetInfoUser } from "../../Hooks/useToken";
import UserPage from "../../Pages/UserPage/UserPage";

const GuestRoute: React.FC = () => {
  const infoUser = useGetInfoUser();

  return (
    <Routes>
      <Route path="/" element={infoUser?.uid ? <UserPage /> : <GuestPage />} />
    </Routes>
  );
};

export default GuestRoute;
