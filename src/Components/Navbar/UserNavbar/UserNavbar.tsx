import React, { useState, useEffect } from "react";
import { MagazineImage } from "../../../Assets/MagazineImage/MagazineImage";
import { Link } from "react-router-dom";
import { Drawer, Avatar } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  BellOutlined,
  MailOutlined,
} from "@ant-design/icons";

const UserNavbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

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

  return (
    <nav className="bg-white shadow-lg w-full fixed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
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
          {isMobile ? (
            <div className="flex md:hidden">
              <button onClick={toggleMenu}>
                <MenuOutlined />
              </button>
              <Drawer
                placement="right"
                onClose={() => setShowDrawer(false)}
                open={showDrawer}
                width="70%"
              ></Drawer>
            </div>
          ) : (
            <div className="ml-10 space-x-8">
              <div className="inline-flex mx-2">
                <MailOutlined style={{ fontSize: "22px" }} />
              </div>
              <div className="inline-flex mx-4">
                <BellOutlined style={{ fontSize: "22px" }} />
              </div>
              <div className="inline-flex mx-4">
                <Avatar size="large" icon={<UserOutlined />} />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
