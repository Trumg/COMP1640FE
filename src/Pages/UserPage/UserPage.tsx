import React, { useState } from "react";
import { Layout, Card, Row, Col } from "antd";
import UserNavbar from "../../Components/Navbar/UserNavbar/UserNavbar";
import { FaArrowUp } from "react-icons/fa"; // Import the FaArrowUp icon

const { Content } = Layout;

const App: React.FC = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

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

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <UserNavbar />
      </div>
      <Content
        style={{
          padding: "24px 48px 0",
          flexGrow: 1,
          marginTop: "69px",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 75px - 48px - 48px)",
            position: "relative",
            zIndex: 0,
          }}
        >
          <Row gutter={16} justify="center">
            {[...Array(10)].map((_, index) => (
              <Col
                key={index}
                span={24}
                style={{
                  marginBottom: "16px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  title="Submission Ideas"
                  bordered={true}
                  hoverable={true} // Make the card hoverable
                  style={{ width: "80%", height: "300px" }} // Adjust card size
                ></Card>
              </Col>
            ))}
          </Row>
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
  );
};

export default App;
