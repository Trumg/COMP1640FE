import React, { useState, useEffect } from "react";
import { MagazineImage } from "../../../Assets/MagazineImage/MagazineImage";
import { Link } from "react-router-dom";
import { Drawer, Avatar, Popover } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { FaBell } from "react-icons/fa";

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
              <div className="flex-shrink-0 py-2" />
              <div className="flex">
                <button onClick={toggleMenu} style={{ marginLeft: "5px" }}>
                  <MenuOutlined />
                </button>
                <Drawer
                  placement="left" // Adjust placement to left
                  onClose={() => setShowDrawer(false)}
                  open={showDrawer}
                  width="70%"
                ></Drawer>
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
              <FaBell size={22} /> {/* Change the size value as needed */}
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
