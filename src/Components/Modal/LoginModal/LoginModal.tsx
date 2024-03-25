import React, { useState } from "react";

const LoginModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
                <div className="sm:flex sm:items-start">
                  <div className="w-full sm:w-1/2 mx-auto">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 text-center mb-6">
                      Login
                    </h3>
                    <div className="mt-2">
                      {/* Continue with Google Button */}
                      <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full mb-2">
                        Continue with Google
                      </button>
                      {/* Or Break */}
                      <div className="text-center mb-2">
                        <span className="text-gray-500">or</span>
                      </div>
                      {/* Email and Password Form */}
                      <form>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email address
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
                        <div className="mt-3">
                          <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full mb-2">
                            Join with Us
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
