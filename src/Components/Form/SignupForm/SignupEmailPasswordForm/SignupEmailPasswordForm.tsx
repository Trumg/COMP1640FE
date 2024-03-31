import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../../../Firebase/firebase";
import { Card, Input } from "antd";
import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons";
import { SignupImage } from "../../../../Assets/SignupImage/SignupImage";

const SignupEmailPasswordForm: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setConfirmPassword(event.target.value);

  const handleSignUp = () => {
    if (!email || !password) return;

    if (password !== confirmPassword) {
      // setError("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (auth.currentUser !== null) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              console.log("Email verification sent");
            })
            .catch((error) => {
              console.error("Error sending email verification:", error);
            });
        }
      })
      // .catch((error) => {
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   setError(errorMessage);
      // });
      .catch(() => {});
  };

  return (
    <div
      className="h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `url('https://media.giphy.com/media/l0IyopaSDZuhof8Nq/giphy.gif')`,
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
        <div className="flex justify-between">
          <Link to="/signup" className="text-[#549b90]">
            <button>
              <ArrowLeftOutlined />
              &nbsp; Back to Signup
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
            <img src={SignupImage} width={200} height={200} alt="Login Image" />
          </div>
        </h3>
        <div className="login-google mt-2">
          <div>
            <div>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-gray-700"
                >
                  Email
                </label>
              </div>
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
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="block text-base font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
              <Input.Password
                id="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                className="relative bg-white text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
              />
            </div>
            <div className="mt-3">
              <div className="mb-3">
                <label
                  htmlFor="confirm-password"
                  className="block text-base font-medium text-gray-700"
                >
                  Confirm Password
                </label>
              </div>
              <Input.Password
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="relative bg-white text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
              />
            </div>
            <div className="mt-3">
              <button
                onClick={handleSignUp}
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

export default SignupEmailPasswordForm;
