import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { message, Card } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";
import { auth } from "../../../Firebase/firebase";
import { LoginImage } from "../../../Assets/LoginImage/LoginImage";
import { GoogleImage } from "../../../Assets/GoogleImage/GoogleImage";
import { motion } from "framer-motion"; // Import motion from framer-motion

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

        message.success("Login Successful");

        setTimeout(() => {
          redirecttoUserPage();
        }, 2000);
      })
      .catch((error) => {
        if (error.code === "auth/cancelled-popup-request") {
          message.info("Login process cancelled by the user.");
          console.log("Login process cancelled by the user.");
        } else {
          message.error(error.message);
          console.error("Authentication error:", error.message);
        }
      });
  };

  const redirecttoUserPage = () => {
    window.location.href = "/";
  };

  return (
    <motion.div // Wrap your main div with motion.div
      initial={{ opacity: 0, x: -50 }} // Set initial opacity to 0 and x to -50 (off-screen to the left)
      animate={{ opacity: 1, x: 0 }} // Animate opacity to 1 and x to 0 (original position)
      transition={{ duration: 0.5 }} // Set transition duration
      className="h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `url('https://media.giphy.com/media/l0Iy3qmrODEarmfHq/giphy.gif')`,
        backgroundSize: "100% auto",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0 backdrop-filter backdrop-blur-md"
        style={{
          filter: "blur(2px)",
          opacity: 0.2,
        }}
      />
      <Card
        className={`w-full max-w-md p-2 ${isMobile ? "max-w-xs" : ""}`}
        style={{
          border: "3px solid #549b90",
          borderRadius: "5px",
          backgroundColor: "#fafafa",
        }}
      >
        <div className="flex justify-end w-full">
          <Link to="/" className="text-[#549b90]">
            <button>
              <CloseOutlined />
            </button>
          </Link>
        </div>
        <h3 className="text-lg font-medium leading-6 text-gray-900 text-center mb-1">
          <div className="flex items-center justify-center">
            <img src={LoginImage} width={200} height={200} alt="Login Image" />
          </div>
        </h3>
        <div className="login-google mt-2 font-roboto">
          <div>
            <Link to="/login-email">
              <button className="relative bg-white text-black  py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200">
                <FaUser />
                <span className="inline-block ml-6">Login with Email</span>
              </button>
            </Link>
          </div>
          <div className="mt-3">
            <button
              className="relative bg-white text-black  py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
              onClick={handleLoginWithGoogle}
            >
              <img src={GoogleImage} width="34" height="34" alt="Google Logo" />
              <span className="inline-block ml-3">Login with Google</span>
            </button>
          </div>
        </div>
        <div className="mt-4 text-center ">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#549b90] font-bold italic">
              SIGNUP
            </Link>
            .
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default LoginForm;
