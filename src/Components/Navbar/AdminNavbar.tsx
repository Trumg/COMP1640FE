import React, { useState, useEffect } from "react";
import { MagazineImage } from "../../Assets/MagazineImage/MagazineImage";
import { Drawer, Popover } from "antd"; // Import Popover and Button from Ant Design
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout, MdOutlineDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const AdminNavbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

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
    console.log("Logout logic goes here");
  };

  const iconSize = "24px";

  const contentProfile = (
    <div className="font-roboto">
      <style>
        {`
      .link-button:hover {
        text-decoration: none;
      }
    `}
      </style>
      <Link to="/admin/profile" className="link-button">
        <button
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            paddingLeft: "10px", // Added padding
          }}
        >
          <CgProfile style={{ marginRight: "5px", fontSize: iconSize }} />
          Profile
        </button>
      </Link>
      <button
        className="text-red-500 link-button"
        onClick={handleLogout}
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "10px", // Added padding
        }}
      >
        <MdOutlineLogout style={{ marginRight: "5px", fontSize: iconSize }} />
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
          <Link to="/admin" className="block cursor-pointer">
            <button className="flex items-center justify-start w-64 py-2 pl-4 bg-[#549b90] rounded-md shadow-md hover:bg-[#549b90] hover:text-white focus:outline-none focus:bg-gray-100 transition duration-300">
              <IoSettingsOutline style={{ fontSize: iconSize }} />
              <span className="ml-2">User Management</span>
            </button>
          </Link>
          <Link
            to="/admin/academic-year-management"
            className="block cursor-pointer mt-2"
          >
            <button className="flex items-center justify-start w-64 py-2 pl-4 bg-[#549b90] rounded-md shadow-md hover:bg-[#549b90] hover:text-white focus:outline-none focus:bg-gray-100 transition duration-100">
              <IoSettingsOutline style={{ fontSize: iconSize }} />
              <span className="ml-2">Academic Year Management</span>
            </button>
          </Link>
          <Link
            to="/admin/faculty-management"
            className="block cursor-pointer mt-2"
          >
            <button className="flex items-center justify-start w-64 py-2 pl-4 bg-[#549b90] rounded-md shadow-md hover:bg-[#549b90] hover:text-white focus:outline-none focus:bg-gray-100 transition duration-100">
              <IoSettingsOutline style={{ fontSize: iconSize }} />
              <span className="ml-2">Faculty Management</span>
            </button>
          </Link>
          <Link
            to="/admin/closure-date-management"
            className="block cursor-pointer mt-2"
          >
            <button className="flex items-center justify-start w-64 py-2 pl-4 bg-[#549b90] rounded-md shadow-md hover:bg-[#549b90] hover:text-white focus:outline-none focus:bg-gray-100 transition duration-100">
              <IoSettingsOutline style={{ fontSize: iconSize }} />
              <span className="ml-2">Closure Date Management</span>
            </button>
          </Link>
          <Link to="/admin/dashboard" className="block cursor-pointer mt-2">
            <button className="flex items-center justify-start w-64 py-2 pl-4 bg-[#549b90] rounded-md shadow-md hover:bg-[#549b90] hover:text-white focus:outline-none focus:bg-gray-100 transition duration-100">
              <MdOutlineDashboard style={{ fontSize: iconSize }} />
              <span className="ml-2">Admin Dashboard</span>
            </button>
          </Link>
        </div>
        <div className="mt-auto p-4 pt-16 text-gray-600 text-base text-center">
          {`© ${new Date().getFullYear()} Magazine. All Rights Reserved.`}
        </div>
      </Drawer>
    </>
  );
};

export default AdminNavbar;
