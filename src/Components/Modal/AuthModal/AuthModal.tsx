import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

enum ModalState {
  LOGIN,
  SIGNUP,
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

  return (
    <>
      <button
        onClick={openModal}
        className="bg-white text-black border-2 border-black hover:bg-gray-400 font-bold py-2 px-4 rounded-full shadow-md mr-4"
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
              {/* Close Button */}
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500"
                  style={{ fontSize: "1.5rem" }}
                >
                  <MdOutlineClose />
                </button>
              </div>

              {/* Modal Content */}
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {currentForm === ModalState.LOGIN ? (
                  <>
                    <h3 className="text-lg font-medium leading-6 text-gray-900 text-center mb-6">
                      Log In
                    </h3>
                    <div className="mt-2">
                      {/* Continue with Google Button */}
                      <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full flex items-center justify-center">
                        <FaGoogle className="mr-2" />
                        <span className="inline-block">
                          Continue with Google
                        </span>
                      </button>

                      {/* Or Break */}
                      <div className="text-center py-5 relative">
                        <div className="absolute left-0 top-1/2 w-1/3 bg-gray-300 h-0.5 transform -translate-y-1/2"></div>
                        <span className="text-gray-500">OR</span>
                        <div className="absolute right-0 top-1/2 w-1/3 bg-gray-300 h-0.5 transform -translate-y-1/2"></div>
                      </div>

                      {/* Email and Password Form */}
                      <form>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="mt-3">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          />
                        </div>
                      </form>
                    </div>
                    <div className="mt-4 text-center">
                      <p>
                        Don't have an account?{" "}
                        <button onClick={toggleForm} className="text-blue-500">
                          Sign Up
                        </button>
                        .
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-medium leading-6 text-gray-900 text-center mb-6">
                      Sign Up
                    </h3>
                    <div className="mt-2">
                      {/* Continue with Google Button */}
                      <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full flex items-center justify-center">
                        <FaGoogle className="mr-2" />
                        <span className="inline-block">
                          Continue with Google
                        </span>
                      </button>

                      {/* Or Break */}
                      <div className="text-center py-5 relative">
                        <div className="absolute left-0 top-1/2 w-1/3 bg-gray-300 h-0.5 transform -translate-y-1/2"></div>
                        <span className="text-gray-500">OR</span>
                        <div className="absolute right-0 top-1/2 w-1/3 bg-gray-300 h-0.5 transform -translate-y-1/2"></div>
                      </div>

                      {/* Sign Up Form */}
                      <form>
                        <div>
                          <label
                            htmlFor="signup-email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="signup-email"
                            name="signup-email"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="mt-3">
                          <label
                            htmlFor="signup-password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="signup-password"
                            name="signup-password"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          />
                        </div>
                      </form>
                    </div>
                    <div className="mt-4 text-center">
                      <p>
                        Already have an account?{" "}
                        <button onClick={toggleForm} className="text-blue-500">
                          Log In
                        </button>
                        .
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* End of Modal Content */}
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full flex items-center justify-center mb-4"
                >
                  {currentForm === ModalState.LOGIN ? "Login" : "Sign Up"}
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
