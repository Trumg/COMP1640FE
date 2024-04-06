import React, { useState, useEffect } from "react";
import { Drawer, Popover } from "antd";
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { MdOutlineLogout } from "react-icons/md";
import { MagazineImage } from "../../Assets/MagazineImage/MagazineImage";

const GuestNavbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setShowDrawer(!showDrawer);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("Role");
    navigate("/");
  };

  const iconSize = "24px";

  const contentProfile = (
    <div className="font-roboto text-center py-4">
      <style>
        {`
          .link-button:hover {
            text-decoration: none;
          }
          .profile-button {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px; /* Adjust padding as needed */
          }
        `}
      </style>
      <button
        className="text-red-500 link-button profile-button"
        onClick={handleLogout}
      >
        <MdOutlineLogout style={{ marginRight: "10px", fontSize: iconSize }} />
        Logout
      </button>
    </div>
  );

  return (
    <>
      <nav className="bg-white shadow-lg w-full fixed z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {isMobile ? (
              <div className="flex">
                <button onClick={toggleMenu} className="p-2 ml-2">
                  <AiOutlineMenu
                    className="w-8 h-8"
                    style={{ fontSize: iconSize }}
                  />
                </button>
              </div>
            ) : (
              <div>
                <img
                  src={MagazineImage}
                  width={200}
                  alt="Magazine Logo"
                  className="my-4"
                />
              </div>
            )}
            <>
              <div className="ml-auto space-x-4 flex items-center">
                <button className="p-2 rounded-full hover:bg-[#549b90]">
                  <FaRegBell
                    className="text-2xl text-gray-700"
                    style={{ fontSize: iconSize }}
                  />
                </button>

                <div className="inline-flex">
                  <Popover
                    content={contentProfile}
                    placement="bottomRight"
                    trigger="click"
                    style={{ width: "800px" }}
                  >
                    <button className="p-2 rounded-full hover:bg-[#549b90]">
                      <FaRegUser
                        className="text-2xl text-gray-700"
                        style={{ fontSize: iconSize }}
                      />
                    </button>
                  </Popover>
                </div>
                {!isMobile && (
                  <button
                    onClick={toggleMenu}
                    className="p-2 rounded-full hover:bg-[#549b90]"
                  >
                    <AiOutlineMenu
                      className="w-8 h-8"
                      style={{ fontSize: iconSize }}
                    />
                  </button>
                )}
              </div>
            </>
          </div>
        </div>
      </nav>
      <Drawer
        placement={isMobile ? "left" : "right"}
        onClose={() => setShowDrawer(false)}
        open={showDrawer}
        width={isMobile ? "75%" : "20%"}
        closable={false}
        className="flex flex-col justify-center items-center text-center"
      >
        <div className="flex flex-col items-center justify-center">
          {isMobile && (
            <div>
              <img
                src={MagazineImage}
                width={200}
                alt="Magazine Logo"
                className="my-4"
              />
            </div>
          )}
        </div>
        <div className="mt-auto p-4 pt-16 text-gray-600 text-base text-center">
          {`© ${new Date().getFullYear()} Magazine. All Rights Reserved.`}
        </div>
      </Drawer>
    </>
  );
};

export default GuestNavbar;
