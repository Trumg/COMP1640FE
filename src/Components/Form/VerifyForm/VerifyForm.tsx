import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { VerifyImage } from "../../../Assets/VerifyImage/VerifyImage";

const VerifyForm: React.FC = () => {
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
        <h3 className="text-lg font-medium leading-6 text-gray-900 text-center mb-1">
          <div className="flex items-center justify-center">
            <img src={VerifyImage} width={200} height={200} alt="Login Image" />
          </div>
        </h3>
      </Card>
    </div>
  );
};

export default VerifyForm;
