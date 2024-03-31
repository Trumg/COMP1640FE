import React, { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const GuardAdmin = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  const navigate = useNavigate(); // Use useNavigate to get the navigation function

  const ComponentWithAdminCheck: React.FC<P> = (props) => {
    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          checkAdmin(user.uid)
            .then((isAdmin) => {
              if (!isAdmin) {
                navigate("/access-denied"); // If the user is not an Admin, access denied
              }
            })
            .catch((error) => {
              console.error("Error checking admin status:", error);
              navigate("/access-denied");
            });
        } else {
          navigate("/access-denied");
        }
      });

      return () => unsubscribe();
    }, [navigate]);

    const checkAdmin = async (userId: string): Promise<boolean> => {
      const userSnapshot = await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get();
      const userData = userSnapshot.data();
      return userData?.isAdmin || false;
    };

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAdminCheck;
};

export default GuardAdmin;
