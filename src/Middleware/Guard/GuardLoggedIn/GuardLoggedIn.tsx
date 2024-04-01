import React, { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

interface GuardLoggedInProps {
  children: ReactNode;
}

const GuardLoggedIn: React.FC<GuardLoggedInProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigate("/"); // Redirect to home if user is logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return <>{children}</>;
};

export default GuardLoggedIn;
