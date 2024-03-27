import React, { useState, useEffect } from "react";
import { MagazineImage } from "../../../Assets/MagazineImage/MagazineImage";
import { Link } from "react-router-dom";
import AuthModalDesktop from "../../Modal/AuthModal/AuthModalDesktop";
import AuthModalMobile from "../../Modal/AuthModal/AuthModalMobile";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { IoMoon, IoSunny } from "react-icons/io5"; // Import moon and sun icons

// Define UserNavbar component
const UserNavbar: React.FC = () => {
  // Implement UserNavbar UI here
  return (
    <nav className="bg-white shadow-lg w-full fixed">
      {/* UserNavbar content */}
    </nav>
  );
};

const GuestNavbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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
                      className="bg-white border border-gray-600 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-400 shadow-md w-full md:w-96"
                    />
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center">
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center space-x-2 rounded-full px-3 py-1 text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                >
                  {isDarkMode ? (
                    <>
                      <IoMoon className="h-6 w-6" />
                    </>
                  ) : (
                    <>
                      <IoSunny className="h-6 w-6" />
                    </>
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

export default GuestNavbar;
