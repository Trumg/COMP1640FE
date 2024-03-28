import React, { useState, useEffect } from "react";
import { MagazineImage } from "../../../Assets/MagazineImage/MagazineImage";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Avatar, Space } from "antd";
import {
  MoonOutlined,
  SunOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";

const UserNavbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Change the breakpoint as needed
    };

    handleResize(); // Call the function to set initial state
    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => window.removeEventListener("resize", handleResize); // Cleanup function
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // You can save the user's preference in localStorage or a state management solution
    // localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
  };

  return (
    <nav className="bg-white shadow-lg w-full fixed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 py-2">
            <Link to="/user">
              <img
                src={MagazineImage}
                width={200}
                height={200}
                alt="Magazine Logo"
              />
            </Link>
          </div>
          {isMobile ? (
            <div className="flex md:hidden">
              <button
                className="text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800 w-12 h-12"
                onClick={toggleMenu}
              >
                {showMenu ? (
                  <FaTimes className="h-8 w-8" />
                ) : (
                  <FaBars className="h-8 w-8" />
                )}
              </button>
            </div>
          ) : (
            <>
              <div className="hidden md:flex items-center">
                <Space size="middle">
                  <button
                    onClick={toggleDarkMode}
                    className="text-xl text-gray-500 hover:text-gray-800 cursor-pointer inline-flex items-center"
                  >
                    {isDarkMode ? (
                      <>
                        <MoonOutlined className="h-6 w-6" />
                      </>
                    ) : (
                      <>
                        <SunOutlined className="h-6 w-6" />
                      </>
                    )}
                  </button>
                  <BellOutlined className="text-xl text-gray-500 hover:text-gray-800 cursor-pointer inline-flex items-center" />
                  <Avatar
                    className="text-xl text-gray-500 hover:text-gray-800 cursor-pointer inline-flex items-center"
                    size="large"
                    icon={<UserOutlined />}
                  />
                </Space>
              </div>
            </>
          )}
        </div>
      </div>
      {/* {isMobile && showMenu && ()} */}
    </nav>
  );
};

export default UserNavbar;
