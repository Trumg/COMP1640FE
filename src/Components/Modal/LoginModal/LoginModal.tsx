import React, { useState } from "react";

enum ModalState {
  LOGIN,
  SIGNUP,
}

const LoginModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(ModalState.LOGIN);

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
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
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
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {currentForm === ModalState.LOGIN ? (
                  <>
                    <h3 className="text-lg font-medium leading-6 text-gray-900 text-center mb-6">
                      Create an Account
                    </h3>
                    <div className="mt-2">
                      {/* Continue with Google Button */}
                      <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full mb-2">
                        Continue with Google
                      </button>
                      {/* Or Break */}
                      <div className="text-center py-5">
                        <span className="text-gray-500">or</span>
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
                      {/* Sign Up Form */}

                      {/* You can add sign up form fields here */}
                    </div>
                    <div className="mt-4 text-center">
                      <button
                        onClick={toggleForm}
                        className="text-blue-500 flex items-center justify-center"
                      >
                        <svg
                          className="h-5 w-5 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M10 4a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5H4.75a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 0110 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Back to Login
                      </button>
                    </div>
                  </>
                )}
              </div>
              {/* End of Modal Content */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {currentForm === ModalState.LOGIN ? "Login" : "Sign Up"}
                </button>
                <button
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
