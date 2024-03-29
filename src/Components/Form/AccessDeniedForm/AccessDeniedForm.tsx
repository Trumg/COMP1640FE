import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AccessDeniedImage } from "../../../Assets/AccessDeniedImage/AccessDeniedImage";

const AccessDeniedForm: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Call the function to set initial state
    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => window.removeEventListener("resize", handleResize); // Cleanup function
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isMobile ? (
        <div className="flex flex-col items-center mb-2">
          <img
            src={AccessDeniedImage}
            width={200}
            height={200}
            alt="Not Found Image"
          />
          <span className="text-[#549b90] text-2xl text-center mb-12">
            Sorry, you are not authorized to access this page.
          </span>
        </div>
      ) : (
        <div className="flex items-center mb-4">
          <img
            src={AccessDeniedImage}
            width={400}
            height={400}
            alt="Not Found Image"
          />
          <span className="text-[#549b90] text-6xl ml-2">| ACCESS DENIED</span>
        </div>
      )}
      <Link to="/" className="text-[#549b90]">
        <button>
          <ArrowLeftOutlined />
          &nbsp; Back to Homepage
        </button>
      </Link>
    </div>
  );
};

export default AccessDeniedForm;
