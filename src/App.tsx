import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import GuestRoute from "./Routes/GuestRoute/GuestRoute";

const App: React.FC = () => {
  return (
    <Router>
      <GuestRoute />
    </Router>
  );
};

export default App;
