import React from "react";
import { Magazine } from "../../Assets/Magazine/Magazine";
import { Link } from "react-router-dom";
import AuthModal from "../Modal/AuthModal/AuthModal";
import { FaSearch } from "react-icons/fa"; // Import the search icon

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg w-full fixed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 py-2">
            <Link to="/">
              <img src={Magazine} width={200} height={200} />
            </Link>
          </div>
          <div className="flex-1 hidden md:block">
            <div className="flex items-center justify-center">
              <div className="relative flex items-center">
                <FaSearch className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-400 shadow-md w-full md:w-96" // Adjusted width to md:w-96
                />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2 mr-4">
              <AuthModal />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
