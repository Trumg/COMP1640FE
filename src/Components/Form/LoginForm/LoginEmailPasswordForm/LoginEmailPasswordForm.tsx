import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { Card, Input } from "antd";
import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons";
import { LoginImage } from "../../../../Assets/LoginImage/LoginImage";
import { auth } from "../../../../Firebase/firebase";

const LoginEmailPasswordForm: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogIn = () => {
    if (!email || !password) return;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

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
            <div>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={handleEmailChange}
                className="relative bg-white text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
              />
            </div>
            <div className="mt-3">
              <Input.Password
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                className="relative bg-white text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
              />
            </div>
            <div className="mt-3">
              <button
                onClick={handleLogIn}
                className="relative bg-[#549b90] text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
              >
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

export default LoginEmailPasswordForm;
