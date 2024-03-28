import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons";
import { SignupImage } from "../../../Assets/SignupImage/SignupImage";
import { GoogleImage } from "../../../Assets/GoogleImage/GoogleImage";
import { FaUser } from "react-icons/fa";

const SignupForm: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Call the function to set initial state
    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => window.removeEventListener("resize", handleResize); // Cleanup function
  }, []);

  return (
    <div
      className="h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `url('https://media.giphy.com/media/l4FGGYrtfJP7qpcDC/giphy.gif')`,
        backgroundSize: "cover",
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
        className={`w-full max-w-md p-2 ${
          isMobile ? "max-w-xs" : "" // Apply max-w-xs class if isMobile is true
        }`}
        style={{
          border: "3px solid #549b90",
          borderRadius: "5px",
          backgroundColor: "#fafafa",
        }}
      >
        <div className="flex justify-between">
          <Link to="/login" className="text-[#549b90]">
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
            <img
              src={SignupImage}
              width={200}
              height={200}
              alt="Signup Image"
            />
          </div>
        </h3>
        <div className="login-google mt-2">
          <div>
            <Link to="/signup-email">
              <button className="relative bg-white text-black  py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200">
                <FaUser />
                <span className="inline-block ml-6">Signup with Email</span>
              </button>
            </Link>
          </div>
          <div className="mt-3">
            <button className="relative bg-white text-black py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200">
              <img src={GoogleImage} width="34" height="34" alt="Google Logo" />
              <span className="inline-block ml-2">Signup with Google</span>
            </button>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
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

export default SignupForm;
