import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ManagerPage from '../../Pages/ManagerPage/ManagerPage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const ManagerRoute: React.FC = () => {
  return (
    <Routes>
      <PrivateRoute path="/manager" component={<ManagerPage />} />
    </Routes>
  );
};

export default ManagerRoute;
