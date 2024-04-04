import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ResetImage } from "../../Assets/ResetImage/ResetImage";

const ResetForm: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

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
        className={`border-[#549b90] border-2 w-full max-w-md p-2 ${
          isMobile ? "max-w-xs" : ""
        }`}
      >
        <h3 className="text-lg font-medium leading-6 text-gray-900 text-center mb-1">
          <div className="flex items-center justify-center">
            <img src={ResetImage} width={200} height={200} alt="Login Image" />
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
            <div>
              <button
                className="relative bg-[#549b90] text-black  py-2 px-4 rounded-full w-full flex items-center justify-center border border-[#549b90] transition duration-300 hover:text-gray-600 hover:border-[#549b90] focus:outline-none hover:bg-gray-200"
                style={{ marginTop: "10px" }}
              >
                <span className="inline-block">Reset Password</span>
              </button>
            </div>
            <div className="mt-4 text-center font-roboto">
              <p>
                Remember your password?{" "}
                <Link to="/" className="text-[#549b90] font-bold italic">
                  LOGIN
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ResetForm;
