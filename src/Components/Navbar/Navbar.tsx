import React, { useState, useEffect } from "react";
import { MagazineImage } from "../../Assets/MagazineImage/MagazineImage";
import { Link } from "react-router-dom";
import AuthModal from "../Modal/AuthModal/AuthModal";
import { FaSearch, FaBars } from "react-icons/fa"; // Import icons

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Change the breakpoint as needed
    };

    handleResize(); // Call the function to set initial state
    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => window.removeEventListener("resize", handleResize); // Cleanup function
  }, []);

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
              <button className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800">
                <FaBars className="h-8 w-16" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 hidden md:block">
                <div className="flex items-center justify-center">
                  <div className="relative flex items-center">
                    <FaSearch className="absolute left-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="bg-white border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-400 shadow-md w-full md:w-96"
                    />
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-2 mr-4">
                  <AuthModal />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
