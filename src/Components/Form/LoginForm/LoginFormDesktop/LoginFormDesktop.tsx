import React from "react";
// import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  // AuthError,
  // sendPasswordResetEmail,
  // sendEmailVerification,
} from "firebase/auth";
import { notification, Card } from "antd";
import {
  UserOutlined,
  GoogleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { auth } from "../../../../Firebase/firebase";

import { LoginImage } from "../../../../Assets/LoginImage/LoginImage";

const LoginFormDesktop: React.FC = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const handleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);

        // Show success notification
        notification.success({
          message: "Login Successful",
        });

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          redirecttoUserPage(); // Call your function to redirect to dashboard
        }, 2000); // 2 seconds delay
      })
      .catch((error) => {
        // Handle errors here
        if (error.code === "auth/cancelled-popup-request") {
          // User cancelled the login process
          notification.info({
            message: "Login Cancelled",
            description: "Login process cancelled by the user.",
          });
          console.log("Login process cancelled by the user.");
        } else {
          // Other authentication errors
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

  // const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  //   setEmail(event.target.value);
  // const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(event.target.value);
  // };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="absolute top-4 left-4"></div>
      <Card
        className="w-full max-w-md p-2"
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
                Log in with email / phone number
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
                Log in with Google
              </span>
            </button>
          </div>
          {/* <form>
            <div>
              <label
                htmlFor="email"
                className="block text-xl font-medium text-gray-700 "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border border-gray-500 rounded-md"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="password"
                className="block text-xl font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border border-gray-500 rounded-md"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </form> */}
        </div>
        <div className="mt-4 text-center">
          {/* <p>
            Forgot password?{" "}
            <Link
              to="/reset-password"
              className="text-[#549b90] font-bold italic"
            >
              RESET
            </Link>
            .
          </p> */}
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

export default LoginFormDesktop;
