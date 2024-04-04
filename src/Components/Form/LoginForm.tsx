import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { LoginImage } from "../../Assets/LoginImage/LoginImage";
import axios from "axios"; // Import Axios library

const LoginForm: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Fetch data from API
    axios
      .post("https://localhost:7279/api/login", { email, password })
      .then((response) => {
        // Handle successful response
        console.log("Login successful:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Login failed:", error);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `url('https://media.giphy.com/media/l0Iy3qmrODEarmfHq/giphy.gif')`,
        backgroundSize: "100% auto",
        backgroundPosition: "center",
      }}
    >
      <Card
        className={`w-full max-w-md p-2 ${isMobile ? "max-w-xs" : ""}`}
        style={{ borderColor: "#549b90" }} // Adding border color here
      >
        <h3 className="text-lg font-medium leading-6 text-gray-900 text-center mb-1">
          <div className="flex items-center justify-center">
            <img src={LoginImage} width={200} height={200} alt="Login Image" />
          </div>
        </h3>
        <div className="login mt-2 font-roboto">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="relative bg-white text-black py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
              style={{ marginBottom: "10px" }}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="relative bg-white text-black py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
                style={{ marginBottom: "10px" }}
              />
              <button
                onClick={toggleShowPassword}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 pr-2"
              >
                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </button>
            </div>
            <div>
              <button
                onClick={handleLogin}
                className="relative bg-white text-black  py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
                style={{ marginTop: "10px" }}
              >
                <span className="inline-block">Login</span>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default LoginForm;
