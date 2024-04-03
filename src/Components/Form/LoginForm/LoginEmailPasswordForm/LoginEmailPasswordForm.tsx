import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { Card, Input, message } from "antd";
import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons";
import { LoginImage } from "../../../../Assets/LoginImage/LoginImage";
import { auth, database } from "../../../../Firebase/firebase";
import { ref, set } from "firebase/database";

const LoginEmailPasswordForm: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogIn = () => {
    if (!email || !password || !name) return;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          const currentUser = auth.currentUser;
          if (currentUser) {
            const updateProfilePromise = updateProfile(currentUser, {
              displayName: name,
            });

            updateProfilePromise
              .then(() => {
                const userData = {
                  uid: user.uid,
                  displayName: name,
                  email: user.email,
                };
                // Set user data to the database
                set(ref(database, `users/${user.uid}`), userData);
                console.log(user);
                message.success("Login Successful");
                setTimeout(() => {
                  redirecttoUserPage();
                }, 2000);
              })
              .catch((error) => {
                console.log(error);
                message.error("Error updating profile");
              });
          } else {
            message.error("User is not authenticated");
          }
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        message.error(errorMessage);
      });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const redirecttoUserPage = () => {
    window.location.href = "/";
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
        <div className="flex justify-between font-roboto">
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
        <div className="login-google mt-2 font-roboto">
          <div>
            <div>
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-base font-medium text-gray-700"
                >
                  Name
                </label>
              </div>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                value={name}
                onChange={handleNameChange}
                className="relative bg-white text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
              />
            </div>
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
                  htmlFor="email"
                  className="block text-base font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
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
        <div className="mt-4 text-center font-roboto">
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
