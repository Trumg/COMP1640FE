import React, { useState, useEffect } from "react";
import { MagazineImage } from "../../Assets/MagazineImage/MagazineImage";
import { Drawer } from "antd";
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegBell, FaRegUser } from "react-icons/fa";

const ManagerNavbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <>
      <nav className="bg-white shadow-lg w-full fixed z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {isMobile ? (
              <>
                <div className="flex">
                  <button onClick={toggleMenu} className="p-2 ml-2">
                    <AiOutlineMenu className="w-8 h-8" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex-shrink-0 mr-4">
                  <img src={MagazineImage} width={200} alt="Magazine Logo" />
                </div>
              </>
            )}
            <>
              <div className="ml-10 space-x-4 flex items-center">
                <button className="p-2 rounded-full hover:bg-gray-200">
                  <FaRegBell className="text-2xl text-gray-700" />
                </button>
                <div className="inline-flex">
                  <button className="p-2 rounded-full hover:bg-gray-200">
                    <FaRegUser className="text-2xl text-gray-700" />
                  </button>
                </div>
              </div>
            </>
          </div>
        </div>
      </nav>
      {isMobile && (
        <Drawer
          placement="left"
          onClose={() => setShowDrawer(false)}
          open={showDrawer}
          width="70%"
          closable={false}
          className=" flex flex-col justify-center items-center text-center"
        >
          <div>
            <img src={MagazineImage} width={200} alt="Magazine Logo" />
            <hr className="my-4 border-gray-400 w-full" />
          </div>
        </Drawer>
      )}
    </>
  );
};

export default ManagerNavbar;
