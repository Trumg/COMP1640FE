import React, { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"; // Import firestore

const GuardManager = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  const navigate = useNavigate(); // Use useNavigate to get the navigation function

  const ComponentWithManagerCheck: React.FC<P> = (props) => {
    useEffect(() => {
      const checkUserAndRedirect = async (user: firebase.User | null) => {
        if (user) {
          try {
            const isManager = await checkManager(user.uid);
            if (!isManager) {
              navigate("/access-denied"); // Redirect to access-denied if not a manager
            }
          } catch (error) {
            console.error("Error checking manager status:", error);
            navigate("/access-denied"); // Redirect to access-denied on error
          }
        } else {
          navigate("/"); // Redirect to home if user is not logged in
        }
      };

      const unsubscribe = firebase
        .auth()
        .onAuthStateChanged(checkUserAndRedirect); // Assign onAuthStateChanged directly

      return () => unsubscribe(); // Unsubscribe when component unmounts
    }, [navigate]); // Include navigate in dependency array if it's actually used in checkUserAndRedirect function

    const checkManager = async (userId: string): Promise<boolean> => {
      const userSnapshot = await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get();
      const userData = userSnapshot.data();
      return userData?.isManager || false; // Assuming isManager is a field in your user document
    };

    return <WrappedComponent {...props} />;
  };

  return ComponentWithManagerCheck;
};

export default GuardManager;
