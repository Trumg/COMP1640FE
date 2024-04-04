import React, { useState, useEffect } from "react";
import { MagazineImage } from "../../Assets/MagazineImage/MagazineImage";
import { Drawer, Popover } from "antd"; // Import Popover and Button from Ant Design
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";

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

  const content = (
    <div className="font-roboto">
      <button style={{ display: "flex", alignItems: "center" }}>
        <CgProfile style={{ marginRight: "5px" }} />
        Profile
      </button>
      <button style={{ display: "flex", alignItems: "center" }}>
        <IoSettingsOutline style={{ marginRight: "5px" }} />
        Settings
      </button>
      <button
        className="text-red-500"
        onClick={handleLogout}
        style={{ display: "flex", alignItems: "center" }}
      >
        <MdOutlineLogout style={{ marginRight: "5px" }} />
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
                  <AiOutlineMenu className="w-8 h-8" />
                </button>
              </div>
            ) : (
              <div>
                <Link to="/admin"></Link>
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
                <button className="p-2 rounded-full hover:bg-gray-200">
                  <FaRegBell className="text-2xl text-gray-700" />
                </button>
                <div className="inline-flex">
                  <Popover
                    content={content}
                    placement="bottomRight"
                    trigger="click"
                    style={{ width: "300px", height: "400px" }}
                  >
                    <button className="p-2 rounded-full hover:bg-gray-200">
                      <FaRegUser className="text-2xl text-gray-700" />
                    </button>
                  </Popover>
                </div>
                {!isMobile && (
                  <button
                    onClick={toggleMenu}
                    className="p-2 rounded-full hover:bg-gray-200"
                  >
                    <AiOutlineMenu className="w-8 h-8" />
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
        <div>
          {isMobile && (
            <div>
              <Link to="/admin"></Link>
              <img
                src={MagazineImage}
                width={200}
                alt="Magazine Logo"
                className="my-4"
              />
            </div>
          )}
          <Link to="/admin/post-management" className="block cursor-pointer">
            <button className="flex items-center justify-center w-full py-2 bg-white rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-300">
              Post Management
            </button>
          </Link>
          <div className="my-4"></div>
          <Link to="/admin/user-management" className="block cursor-pointer">
            <button className="flex items-center justify-center w-full py-2 bg-white rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-300">
              User Management
            </button>
          </Link>
        </div>
      </Drawer>
    </>
  );
};

export default AdminNavbar;
