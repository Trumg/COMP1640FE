import React, { useState } from "react";
import { Layout } from "antd";
import GuestNavbar from "../../Components/Navbar/GuestNavbar/GuestNavbar";
import { FaArrowUp } from "react-icons/fa";
import useToken from "../../Hooks/useToken";

const { Content } = Layout;

const GuestPage: React.FC = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const token = useToken();
  console.log(token);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize(); // Call handleResize initially to set the initial state
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
        }}
      >
        <GuestNavbar />
      </div>
      <Layout style={{ marginTop: "80px" }}>
        <Content
          style={{
            padding: "24px 48px 0",
            flexGrow: 1,
            overflowY: "auto",
            marginLeft: isMobileView ? 0 : "25%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "calc(100vh - 75px - 50px - 50px)",
              position: "relative",
              zIndex: 0,
            }}
          >
            {/* Your content here */}
          </div>
          {showScrollButton && (
            <button
              className="bg-[#549b90] hover:bg-gray-400 text-white font-bold h-12 w-12 rounded-full fixed bottom-10 right-10 z-10 flex justify-center items-center"
              onClick={scrollToTop}
            >
              <FaArrowUp />
            </button>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default GuestPage;
