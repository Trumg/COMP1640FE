import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { NotFoundImage } from "../../../Assets/NotFoundImage/NotFoundImage";

const NotFoundForm: React.FC = () => {
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
            src={NotFoundImage}
            width={200}
            height={200}
            alt="Not Found Image"
          />
          <span className="text-[#549b90] text-center mb-12">
            Sorry, the page you visited does not exist.
          </span>
        </div>
      ) : (
        <div className="flex items-center mb-4">
          <img
            src={NotFoundImage}
            width={400}
            height={400}
            alt="Not Found Image"
          />
          <span className="text-[#549b90] text-6xl ml-2">| NOT FOUND</span>
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

export default NotFoundForm;
