import React, { useState, useEffect } from "react";
import { MagazineImage } from "../../../Assets/MagazineImage/MagazineImage";
import { Link } from "react-router-dom";
import { Drawer, Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FaBell } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";

const UserNavbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Change the breakpoint as needed
    };

    handleResize(); // Call the function to set initial state
    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => window.removeEventListener("resize", handleResize); // Cleanup function
  }, []);

  const toggleMenu = () => {
    setShowDrawer(!showDrawer);
  };

  const handleAvatarClick = () => {
    setPopoverVisible(!popoverVisible);
  };

  const content = (
    <div>
      <p>Content of the popover</p>
    </div>
  );

  return (
    <nav className="bg-white shadow-lg w-full fixed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {isMobile ? (
            <>
              <div className="flex">
                <button onClick={toggleMenu} className="p-2 ml-2">
                  <AiOutlineMenu className="w-8 h-8" />
                </button>
                <Drawer
                  placement="left" // Adjust placement to left
                  onClose={() => setShowDrawer(false)}
                  visible={showDrawer} // Set visible prop instead of open
                  width="70%"
                  closable={false} // Hide the close button
                  className="flex flex-col justify-center items-center text-center"
                >
                  <div>
                    <img
                      src={MagazineImage}
                      width={200}
                      height={200}
                      className="w-auto h-auto mt-0"
                      alt="Magazine Logo"
                    />
                    <hr className="my-4 border-gray-400 w-full" />
                  </div>
                </Drawer>
              </div>
            </>
          ) : (
            <div className="flex-shrink-0 py-2">
              <Link to="/user">
                <img
                  src={MagazineImage}
                  width={200}
                  height={200}
                  alt="Magazine Logo"
                />
              </Link>
            </div>
          )}
          <div className="ml-10 space-x-4">
            <div className="inline-flex mx-3">
              <FaBell
                size={22}
                className="transition duration-300 ease-in-out hover:text-[#549b90]"
              />
            </div>
            <div className="inline-flex mx-3">
              <Popover
                content={content}
                trigger="click"
                visible={popoverVisible}
                onVisibleChange={setPopoverVisible}
                placement="bottomRight"
              >
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  style={{ cursor: "pointer" }}
                  onClick={handleAvatarClick}
                />
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
