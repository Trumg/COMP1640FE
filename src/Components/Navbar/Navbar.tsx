import React from "react";
import { Magazine } from "../../Assets/Magazine/Magazine";
import { Link } from "react-router-dom";
import LoginModal from "../Modal/LoginModal/LoginModal";
import SignUpModal from "../Modal/SignupModal.tsx/SignupModal";

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
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2 mr-4">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white border-2 border-black rounded-full py-2 px-4 shadow-md w-64"
              />

              <LoginModal />
              <SignUpModal />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
