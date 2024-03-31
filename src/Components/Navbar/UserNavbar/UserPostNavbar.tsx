import React, { useState, useEffect } from "react";
import { MagazineImage } from "../../../Assets/MagazineImage/MagazineImage";
import { Link, useNavigate } from "react-router-dom";
import { Drawer, Avatar, Popover } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons"; // Import PlusOutlined for the create post icon
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { useGetInfoUser } from "../../../Hooks/useToken";

const UserPostNavbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [avatarPopoverVisible, setAvatarPopoverVisible] =
    useState<boolean>(false);
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

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign Out");
        navigate("/"); // Redirect to homepage after logout
      })
      .catch((error) => console.log(error));
  };

  // useGetInfoUser
  const infoUser = useGetInfoUser();
  const avatarContent = (
    <div className="p-6" style={{ maxWidth: "300px" }}>
      <div className="flex items-center mb-2">
        <div>
          <p className="font-bold mb-2">{infoUser?.displayName}</p>
          <p className="text-gray-600 mb-2">{infoUser?.email}</p>
        </div>
      </div>
      <hr className="border-t w-full my-2" />
      <div className="mb-2">
        <Link to="/profile" className="block">
          <button className="w-full text-left">Profile</button>
        </Link>
      </div>
      <div className="mb-2">
        <Link to="/settings" className="block">
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

  // Function to handle create post
  const handleCreatePost = () => {
    // Add your logic for creating a post
    console.log("Creating a post...");
  };

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
                  placement="left"
                  onClose={() => setShowDrawer(false)}
                  open={showDrawer}
                  width="70%"
                  closable={false}
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
            <>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link to="/">
                    <img
                      src={MagazineImage}
                      width={200}
                      height={200}
                      alt="Magazine Logo"
                      className="py-2"
                    />
                  </Link>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-200">
                  <AiOutlineMenu className="w-8 h-8 text-gray-700" />
                </button>
              </div>
            </>
          )}
          <>
            <div className="ml-10 space-x-4 flex items-center">
              {/* Create Post Icon */}
              <Link to="/post">
                <button
                  onClick={handleCreatePost}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  <PlusOutlined className="text-2xl text-gray-700" />
                </button>
              </Link>

              {/* Avatar and Popover */}
              <div className="inline-flex mx-3">
                <Popover
                  content={avatarContent}
                  trigger="click"
                  open={avatarPopoverVisible}
                  onOpenChange={setAvatarPopoverVisible}
                  placement="bottomRight"
                  overlayStyle={{ width: "300px" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      size={45}
                      src={infoUser?.photoURL}
                      icon={<UserOutlined />}
                      style={{ cursor: "pointer" }}
                      onClick={handleAvatarClick}
                    />
                    <div style={{ flex: 1 }}></div>
                  </div>
                </Popover>
              </div>
            </div>
          </>
        </div>
      </div>
    </nav>
  );
};

export default UserPostNavbar;
