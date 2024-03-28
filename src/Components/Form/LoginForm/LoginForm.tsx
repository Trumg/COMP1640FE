import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { notification, Card } from "antd";
import {
  UserOutlined,
  GoogleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { auth } from "../../../Firebase/firebase";

import { LoginImage } from "../../../Assets/LoginImage/LoginImage";

const LoginForm: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Call the function to set initial state
    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => window.removeEventListener("resize", handleResize); // Cleanup function
  }, []);

  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);

        notification.success({
          message: "Login Successful",
        });

        setTimeout(() => {
          redirecttoUserPage();
        }, 2000);
      })
      .catch((error) => {
        if (error.code === "auth/cancelled-popup-request") {
          notification.info({
            message: "Login Cancelled",
            description: "Login process cancelled by the user.",
          });
          console.log("Login process cancelled by the user.");
        } else {
          notification.error({
            message: "Authentication Error",
            description: error.message,
          });
          console.error("Authentication error:", error.message);
        }
      });
  };

  const redirecttoUserPage = () => {
    window.location.href = "/user";
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="absolute top-4 left-4"></div>
      <Card
        className={`w-full max-w-md p-2 ${
          isMobile ? "max-w-xs" : "" // Apply max-w-xs class if isMobile is true
        }`}
        style={{ border: "3px solid #549b90", borderRadius: "5px" }}
      >
        <Link to="/" className="text-[#549b90]">
          <button>
            <ArrowLeftOutlined />
            &nbsp; Back to Homepage
          </button>
        </Link>
        <h3 className="text-lg font-medium leading-6 text-gray-900 text-center mb-1">
          <div className="flex items-center justify-center">
            <img src={LoginImage} width={200} height={200} alt="Login Image" />
          </div>
        </h3>
        <div className="login-google mt-2">
          <div>
            <button className="relative bg-white text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200">
              <UserOutlined />
              <span className="inline-block ml-2">
                Login with email / phone number
              </span>
            </button>
          </div>
          <div className="mt-3">
            <button className="relative bg-white text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200">
              <GoogleOutlined />
              <span
                onClick={handleLoginWithGoogle}
                className="inline-block ml-2"
              >
                Login with Google
              </span>
            </button>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#549b90] font-bold italic">
              SIGNUP
            </Link>
            .
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
