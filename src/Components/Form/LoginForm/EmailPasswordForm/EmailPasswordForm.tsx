import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { LoginImage } from "../../../../Assets/LoginImage/LoginImage";

const LoginForm: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Call the function to set initial state
    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => window.removeEventListener("resize", handleResize); // Cleanup function
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // const handleConfirmPasswordChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setConfirmPassword(e.target.value);
  // };

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
            <div>
              <Input
                placeholder="Enter Email"
                value={email}
                onChange={handleEmailChange}
                className="relative bg-white text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
              />
            </div>
            <div className="mt-3">
              <Input.Password
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                className="relative bg-white text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
              />
            </div>
            {/* <div className="mt-3">
              <Input.Password
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="relative bg-white text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
              />
            </div> */}
            <div className="mt-3">
              <button className="relative bg-[#549b90] text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200">
                <span className="inline-block ml-2">Submit</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p>
            Forgot your password?{" "}
            <Link
              to="/reset-password"
              className="text-[#549b90] font-bold italic"
            >
              RESET
            </Link>
            .
          </p>
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
