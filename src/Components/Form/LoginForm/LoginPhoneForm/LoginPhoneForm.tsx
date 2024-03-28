import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Input } from "antd";
import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons";
import { LoginImage } from "../../../../Assets/LoginImage/LoginImage";

const LoginPhoneForm: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        className={`w-full max-w-md p-2 ${isMobile ? "max-w-xs" : ""}`}
        style={{ border: "3px solid #549b90", borderRadius: "5px" }}
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
            <img src={LoginImage} width={200} height={200} alt="Login Image" />
          </div>
        </h3>
        <div className="login-google mt-2">
          <div>
            <div className="flex justify-between">
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-gray-700"
                >
                  Phone Number
                </label>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-gray-700"
                >
                  <Link to="/login-email">
                    <button className="text-[#549b90] font-bold italic">
                      Login with Email
                    </button>
                  </Link>
                </label>
              </div>
            </div>
            <div>
              <Input
                type="phone"
                id="phone"
                name="phone"
                placeholder="Enter Phone Number"
                className="relative bg-white text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
              />
            </div>
            <div className="mt-3">
              <Input
                type="phone"
                id="phone"
                name="phone"
                placeholder="Enter Code"
                className="relative bg-white text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
              />
            </div>
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

export default LoginPhoneForm;
