import React, { useState, useEffect } from "react";
import { MagazineImage } from "../../../Assets/MagazineImage/MagazineImage";
import { Link } from "react-router-dom";
import AuthModalDesktop from "../../Modal/AuthModal/AuthModalDesktop";
import AuthModalMobile from "../../Modal/AuthModal/AuthModalMobile";
import { FaSearch, FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [darkTheme, setDarkTheme] = useState<boolean>(false); // State for dark theme

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

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme); // Toggle dark theme state
  };

  return (
    <nav
      className={`bg-white shadow-lg w-full fixed ${darkTheme ? "dark" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 py-2">
            <Link to="/">
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
                className="text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800"
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
              <div className="flex-1 hidden md:block">
                <div className="flex items-center justify-center">
                  <div className="relative flex items-center">
                    <FaSearch className="absolute left-3 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className={`bg-white border border-gray-600 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-400 shadow-md w-full md:w-96 ${
                        darkTheme ? "dark" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center">
                <button
                  onClick={toggleDarkTheme}
                  className="ml-4 p-2 focus:outline-none"
                >
                  {darkTheme ? (
                    <FaSun className="h-6 w-6 text-yellow-500" />
                  ) : (
                    <FaMoon className="h-6 w-6 text-gray-500" />
                  )}
                </button>
                <div className="ml-10 space-x-2">
                  <AuthModalDesktop />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {isMobile && showMenu && (
        <div className="md:hidden bg-gray-100 py-2">
          <div className="px-4">
            <AuthModalMobile />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
