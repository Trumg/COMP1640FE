import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ResetImage } from "../../../Assets/ResetImage/ResetImage";

const ResetForm: React.FC = () => {
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
    <div className="flex justify-center items-center h-screen">
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
            <img src={ResetImage} width={200} height={200} alt="Login Image" />
          </div>
        </h3>
        <div className="mt-4 text-center">
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
