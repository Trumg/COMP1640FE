import React, { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { Link } from "react-router-dom";
import { Card, Input, message } from "antd"; // Import message component
import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons";
import { ResetImage } from "../../../Assets/ResetImage/ResetImage";

const ResetForm: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        message.success("Password reset email sent. Please check your inbox.");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `url('https://media.giphy.com/media/l4FGGYrtfJP7qpcDC/giphy.gif')`,
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
      <div className="absolute top-4 left-4"></div>
      <Card
        className={`w-full max-w-md p-2 ${isMobile ? "max-w-xs" : ""}`}
        style={{
          border: "3px solid #549b90",
          borderRadius: "5px",
          backgroundColor: "#fafafa",
        }}
      >
        <div className="flex justify-between font-roboto">
          <Link to="/login-email" className="text-[#549b90]">
            <button>
              <ArrowLeftOutlined />
              &nbsp; Back to Login
            </button>
          </Link>
          <Link to="/" className="text-[#549b90]">
            <button>
              <CloseOutlined />
            </button>
          </Link>
        </div>
        <h3 className="text-lg font-medium leading-6 text-gray-900 text-center mb-1">
          <div className="flex items-center justify-center">
            <img src={ResetImage} width={200} height={200} alt="Login Image" />
          </div>
        </h3>
        <div className="login-google mt-2 font-roboto">
          <div>
            <div>
              <Input
                type="email"
                id="reset-password"
                name="reset-password"
                placeholder="Enter Email"
                className="relative bg-white text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <button
                onClick={handleForgotPassword}
                className="relative bg-[#549b90] text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
              >
                <span className="inline-block ml-2">Reset</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center font-roboto">
          <p>
            Remembered your password?{" "}
            <Link to="/login" className="text-[#549b90] font-bold italic">
              LOGIN
            </Link>
            .
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ResetForm;
