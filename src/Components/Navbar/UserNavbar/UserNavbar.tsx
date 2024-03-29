import React, { useState, useEffect } from "react";
import { MagazineImage } from "../../../Assets/MagazineImage/MagazineImage";
import { Link, useNavigate } from "react-router-dom";
import { Drawer, Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FaBell } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";

const UserNavbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [avatarPopoverVisible, setAvatarPopoverVisible] =
    useState<boolean>(false);
  const [bellPopoverVisible, setBellPopoverVisible] = useState<boolean>(false);
  const navigate = useNavigate();

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
    setAvatarPopoverVisible(!avatarPopoverVisible);
  };

  const handleBellClick = () => {
    setBellPopoverVisible(!bellPopoverVisible);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign Out");
        navigate("/"); // Redirect to homepage after logout
      })
      .catch((error) => console.log(error));
  };

  const bellContent = <div className="p-4"></div>;

  const avatarContent = (
    <div
      className="p-4"
      style={{ width: "180px", maxHeight: "220px", overflowY: "auto" }}
    >
      <div className="flex items-center mb-2">
        <div>
          <p className="font-bold mb-2">User Name</p>
          <p className="text-gray-600 mb-2">user@example.com</p>
        </div>
      </div>
      <hr className="border-t w-full my-2" />
      <div className="mb-2">
        <Link to="/user/profile" className="block">
          <button className="w-full text-left">Profile</button>
        </Link>
      </div>
      <div className="mb-2">
        <Link to="/user/settings" className="block">
          <button className="w-full text-left">Settings</button>
        </Link>
      </div>
      <hr className="border-t w-full my-2" />
      <div>
        <button
          onClick={handleSignOut}
          className="block text-red-600 cursor-pointer w-full text-left"
        >
          Log Out
        </button>
      </div>
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
              <Popover
                content={bellContent}
                trigger="click"
                visible={bellPopoverVisible}
                onVisibleChange={setBellPopoverVisible}
                placement="bottomRight"
              >
                <FaBell
                  size={22}
                  style={{ cursor: "pointer" }}
                  className="transition duration-300 ease-in-out hover:text-[#549b90]"
                  onClick={handleBellClick}
                />
              </Popover>
            </div>
            <div className="inline-flex mx-3">
              <Popover
                content={avatarContent}
                trigger="click"
                visible={avatarPopoverVisible}
                onVisibleChange={setAvatarPopoverVisible}
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
