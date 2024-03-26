import React, { useState, useEffect } from "react";
import { MagazineImage } from "../../../Assets/MagazineImage/MagazineImage";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";

import { FaSearch, FaUser } from "react-icons/fa";
import { IoMoon, IoSunny } from "react-icons/io5";

const UserNavbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Change the breakpoint as needed
    };

    handleResize(); // Call the function to set initial state
    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => window.removeEventListener("resize", handleResize); // Cleanup function
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // You can save the user's preference in localStorage or a state management solution
    // localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
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
          <div className="flex-1 hidden md:flex items-center justify-center">
            <div className="relative flex items-center">
              <FaSearch className="absolute left-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-white border border-gray-600 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-400 shadow-md w-full md:w-96"
              />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="flex items-center space-x-2 rounded-full px-3 py-1 text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800"
            >
              {isDarkMode ? (
                <IoMoon className="h-6 w-6" />
              ) : (
                <IoSunny className="h-6 w-6" />
              )}
            </button>
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 rounded-full px-3 py-1 text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800"
              >
                <FaUser className="h-6 w-6" />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                  {/* Add your popover menu items here */}
                  <Link
                    to="/user/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isMobile && (
        <div className="md:hidden bg-gray-100 py-2">
          <div className="px-4"></div>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
