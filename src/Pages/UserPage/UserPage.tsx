import React, { useState } from "react";
import { Layout, Card, Row, Col, Button, Dropdown, Menu } from "antd";
import UserNavbar from "../../Components/Navbar/UserNavbar/UserNavbar";
import { FaArrowUp, FaArrowDown, FaRegComment } from "react-icons/fa";
import useToken from "../../Hooks/useToken";
import { HiMenuAlt4 } from "react-icons/hi";

const { Content } = Layout;

const UserPage = () => {
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

  const menu = (
    <Menu>
      <Menu.Item>
        <Button
          type="link"
          icon={<FaArrowUp style={{ color: "#549b90", fontSize: "18px" }} />}
        />
      </Menu.Item>
      <Menu.Item>
        <Button
          type="link"
          icon={<FaArrowDown style={{ color: "#549b90", fontSize: "18px" }} />}
        />
      </Menu.Item>
      <Menu.Item>
        <Button
          type="link"
          icon={<FaRegComment style={{ color: "#549b90", fontSize: "18px" }} />}
        />
      </Menu.Item>
    </Menu>
  );

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
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>Ideas</span>
                      <div>
                        {isMobileView ? (
                          <Dropdown overlay={menu} trigger={["click"]}>
                            <Button
                              type="link"
                              icon={
                                <HiMenuAlt4
                                  style={{ color: "#549b90", fontSize: "18px" }}
                                />
                              }
                            />
                          </Dropdown>
                        ) : (
                          <>
                            <Button
                              type="link"
                              icon={
                                <FaArrowUp
                                  style={{ color: "#549b90", fontSize: "18px" }}
                                />
                              }
                            />
                            <Button
                              type="link"
                              icon={
                                <FaArrowDown
                                  style={{ color: "#549b90", fontSize: "18px" }}
                                />
                              }
                            />
                            <Button
                              type="link"
                              icon={
                                <FaRegComment
                                  style={{ color: "#549b90", fontSize: "18px" }}
                                />
                              }
                            />
                          </>
                        )}
                      </div>
                    </div>
                  }
                  bordered={true}
                  hoverable={true}
                  style={{ width: "80%", height: "300px" }}
                >
                  Content is here
                </Card>
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

export default UserPage;
