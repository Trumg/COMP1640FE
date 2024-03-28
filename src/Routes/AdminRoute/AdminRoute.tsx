import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from '../../Pages/AdminPage/AdminPage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const AdminRoute: React.FC = () => {
  return (
    <Routes>
      <PrivateRoute path="/admin" component={<AdminPage />} />
    </Routes>
  );
};

export default AdminRoute;
