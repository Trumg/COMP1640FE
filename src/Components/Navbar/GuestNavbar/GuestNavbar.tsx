import React, { useState, useEffect } from "react";
import { MagazineImage } from "../../../Assets/MagazineImage/MagazineImage";
import { Link } from "react-router-dom";
import { Drawer } from "antd";
import { AiOutlineMenu } from "react-icons/ai";
import { LuLogIn } from "react-icons/lu";

const GuestNavbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Change the breakpoint as needed
    };

    handleResize(); // Call the function to set initial state
    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => window.removeEventListener("resize", handleResize); // Cleanup function
  }, []);

  const toggleMenu = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <div className="fixed top-0 z-50 bg-white shadow-lg w-full">
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src={MagazineImage}
                  width={200}
                  height={200}
                  alt="Magazine Logo"
                  className="py-2"
                />
              </Link>
            </div>
            {isMobile ? (
              <>
                <div className="flex">
                  <button onClick={toggleMenu} className="p-2 ml-2">
                    <AiOutlineMenu className="w-8 h-8" />
                  </button>
                  <Drawer
                    placement="right"
                    onClose={() => setShowDrawer(false)}
                    open={showDrawer}
                    width="70%"
                    closable={false}
                    className="flex flex-col justify-center items-center text-center"
                  >
                    <div className="w-full flex justify-end">
                      <Link to="/login" className="text-white items-center">
                        <button className="text-[#549b90] text-xl flex items-center">
                          <LuLogIn className="mr-2" /> JOIN MAGAZINE
                        </button>
                      </Link>
                    </div>
                  </Drawer>
                </div>
              </>
            ) : (
              <div className="ml-10 space-x-2">
                <Link to="/login" className="text-white">
                  <button className="bg-[#549b90] border-1 border-black hover:bg-gray-400 font-bold py-2 px-4 rounded-full shadow-md mr-4">
                    JOIN MAGAZINE
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default GuestNavbar;
