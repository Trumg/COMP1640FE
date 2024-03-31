import React, { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const GuardUser = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  const navigate = useNavigate(); // Use useNavigate to get the navigation function

  const ComponentWithUserCheck: React.FC<P> = (props) => {
    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          navigate("/"); // If guest is not logged in, redirect to the homepage
        }
      });

      return () => unsubscribe();
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithUserCheck;
};

export default GuardUser;
