import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { MdOutlineArrowBack } from "react-icons/md";
import { LoginImage } from "../../../Assets/LoginImage/LoginImage";
import { SignupImage } from "../../../Assets/SignupImage/SignupImage";
import { ResetImage } from "../../../Assets/ResetImage/ResetImage";
import { GoogleImage } from "../../../Assets/GoogleImage/GoogleImage";

enum ModalState {
  LOGIN,
  SIGNUP,
  RESET_PASSWORD,
}

const AuthModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentForm, setCurrentForm] = useState<ModalState>(ModalState.LOGIN);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentForm(ModalState.LOGIN); // Reset to login form when closing modal
  };

  const toggleForm = () => {
    setCurrentForm(
      currentForm === ModalState.LOGIN ? ModalState.SIGNUP : ModalState.LOGIN
    );
  };

  const openResetPasswordModal = () => {
    setCurrentForm(ModalState.RESET_PASSWORD);
  };

  const renderModalContent = () => {
    switch (currentForm) {
      case ModalState.LOGIN:
        return (
          <>
            <h3 className="text-lg font-medium leading-6 text-gray-900 text-center mb-1">
              <div className="flex items-center justify-center">
                <img
                  src={LoginImage}
                  width={120}
                  height={120}
                  alt="Login Image"
                />
              </div>
            </h3>
            <div className="mt-2">
              <button className="relative bg-white text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-gray-500 transition duration-300 hover:text-gray-600 hover:border-gray-500 focus:outline-none hover:bg-gray-100">
                <img
                  src={GoogleImage}
                  width="36"
                  height="36"
                  alt="Google Logo"
                />
                <span className="inline-block ml-2">Continue with Google</span>
              </button>
              <div className="text-center py-5 relative">
                <div className="absolute left-0 top-1/2 w-52 bg-gray-300 h-0.5 transform -translate-y-1/2"></div>
                <span className="text-gray-600">OR</span>
                <div className="absolute right-0 top-1/2 w-52 bg-gray-300 h-0.5 transform -translate-y-1/2"></div>
              </div>
              <form>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xl font-medium text-gray-700 "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 p-2 w-full border border-gray-500 rounded-md"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-3">
                  <label
                    htmlFor="password"
                    className="block text-xl font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 p-2 w-full border border-gray-500 rounded-md"
                    placeholder="Enter your password"
                  />
                </div>
              </form>
            </div>
            <div className="mt-4 text-center">
              <p>
                Forgot password?{" "}
                <button
                  onClick={openResetPasswordModal}
                  className="text-blue-500"
                >
                  RESET
                </button>
                .
              </p>
              <p>
                Don't have an account?{" "}
                <button onClick={toggleForm} className="text-blue-500">
                  SIGN UP
                </button>
                .
              </p>
            </div>
          </>
        );
      case ModalState.SIGNUP:
        return (
          <>
            <div className="absolute top-0 left-0 pt-4 pl-4">
              <button
                onClick={() => setCurrentForm(ModalState.LOGIN)}
                className="text-gray-400 hover:text-gray-500 text-xl"
              >
                <MdOutlineArrowBack />
              </button>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={SignupImage}
                width={120}
                height={120}
                alt="Signup Image"
              />
            </div>
            <div className="mt-2">
              <button className="relative bg-white text-black font-bold py-2 px-4 rounded-full w-full flex items-center justify-center border border-gray-500 transition duration-300 hover:text-gray-600 hover:border-gray-500 focus:outline-none hover:bg-gray-100">
                <img
                  src={GoogleImage}
                  width="36"
                  height="36"
                  alt="Google Logo"
                />
                <span className="inline-block ml-2">Continue with Google</span>
              </button>
              <div className="text-center py-5 relative">
                <div className="absolute left-0 top-1/2 w-52 bg-gray-300 h-0.5 transform -translate-y-1/2"></div>
                <span className="text-gray-600">OR</span>
                <div className="absolute right-0 top-1/2 w-52 bg-gray-300 h-0.5 transform -translate-y-1/2"></div>
              </div>
              <form>
                <div>
                  <label
                    htmlFor="signup-email"
                    className="block text-xl font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="signup-email"
                    name="signup-email"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-3">
                  <label
                    htmlFor="signup-password"
                    className="block text-xl font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="signup-password"
                    name="signup-password"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter your password"
                  />
                </div>
              </form>
            </div>
            <div className="mt-4 text-center">
              <p>
                Already have an account?{" "}
                <button onClick={toggleForm} className="text-blue-500">
                  LOG IN
                </button>
                .
              </p>
            </div>
          </>
        );
      case ModalState.RESET_PASSWORD:
        return (
          <>
            <div className="flex items-center justify-center">
              <img
                src={ResetImage}
                width={120}
                height={120}
                alt="Reset Image"
              />
            </div>
            <div className="absolute top-0 left-0 pt-4 pl-4">
              <button
                onClick={() => setCurrentForm(ModalState.LOGIN)}
                className="text-gray-400 hover:text-gray-500 text-xl"
              >
                <MdOutlineArrowBack />
              </button>
            </div>
            <form>
              <div>
                <label
                  htmlFor="reset-password"
                  className="block text-xl text-center font-medium text-gray-700"
                >
                  Reset your password
                </label>
                <input
                  type="email"
                  id="reset-password"
                  name="reset-password"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => setCurrentForm(ModalState.LOGIN)}
                  className="inline-block text-blue-500"
                >
                  LOG IN
                </button>
                <span className="mx-2"> &bull; </span>
                <button
                  onClick={() => setCurrentForm(ModalState.SIGNUP)}
                  className="inline-block text-blue-500"
                >
                  SIGN UP
                </button>
              </div>
            </form>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <button
        onClick={openModal}
        className="bg-red-600 text-white border-1 border-black hover:bg-gray-400 font-bold py-2 px-4 rounded-full shadow-md mr-4"
      >
        Log In
      </button>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500 text-xl"
                >
                  <MdOutlineClose />
                </button>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {renderModalContent()}
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  className="bg-red-600 text-white font-bold py-2 px-4 hover:bg-gray-400
                  rounded-full w-full flex items-center justify-center mb-4"
                >
                  {currentForm === ModalState.LOGIN
                    ? "Login"
                    : currentForm === ModalState.SIGNUP
                    ? "Sign Up"
                    : "Reset Password"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
