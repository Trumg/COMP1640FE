import React, { useEffect, useRef, useState } from "react";
import { Layout, Card, Input, Tabs, Upload } from "antd";
import UserPostNavbar from "../../../Components/Navbar/UserNavbar/UserPostNavbar";
import { InboxOutlined } from "@ant-design/icons";
import { FaUpload } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

const { Content } = Layout;
const { TabPane } = Tabs;

const UserPostPage: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = useState<string>("1");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.backgroundColor = "transparent";
    const updateMediaQuery = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    updateMediaQuery(); // Initial check
    window.addEventListener("resize", updateMediaQuery); // Listen for window resize
    return () => {
      document.body.style.backgroundColor = "";
      window.removeEventListener("resize", updateMediaQuery); // Clean up
    };
  }, []);

  const handleTextareaResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleNextButtonClick = () => {
    setActiveTab((prevTab) => {
      const nextTab = parseInt(prevTab) + 1;
      return nextTab.toString();
    });
  };

  const handlePreviousButtonClick = () => {
    setActiveTab((prevTab) => {
      const previousTab = parseInt(prevTab) - 1;
      return previousTab.toString();
    });
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <Layout>
      <UserPostNavbar />
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          paddingTop: isMobile ? "125px" : "150px",
          paddingBottom: "25px",
        }}
      >
        <Card
          className="shadow-md rounded-md"
          style={{
            width: isMobile ? "90%" : "100%",
            maxWidth: "80%",
            maxHeight: "100%",
            position: "relative",
            overflow: "hidden",
            height: isMobile ? "500px" : "500px",
          }}
        >
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane
              tab={
                isMobile ? (
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <IoDocumentTextOutline style={{ marginRight: "8px" }} />
                  </span>
                ) : (
                  "Ideas"
                )
              }
              key="1"
            >
              <div style={{ zIndex: 1 }}>
                <Input.TextArea
                  ref={textareaRef}
                  placeholder="Title"
                  className="border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  autoSize={{ minRows: 1, maxRows: 1 }}
                  style={{ marginBottom: "20px" }}
                  onInput={handleTextareaResize}
                />
                <Input.TextArea
                  placeholder="Content"
                  autoSize={{ minRows: 10, maxRows: 10 }}
                  className="border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  style={{
                    width: "100%",
                    minHeight: "100px",
                    maxHeight: "calc(100vh - 200px)",
                    overflowY: "auto",
                    marginBottom: "20px",
                  }}
                />
                <div style={{ textAlign: "right" }}>
                  <button
                    className="bg-[#549b90] border-1 border-black hover:bg-gray-400 font-bold py-2 px-4 rounded-full shadow-md"
                    onClick={handleNextButtonClick}
                  >
                    Next
                  </button>
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                isMobile ? (
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <FaUpload style={{ marginRight: "8px" }} />
                  </span>
                ) : (
                  "Upload"
                )
              }
              key="2"
            >
              <div style={{ zIndex: 2, width: "100%", height: "280px" }}>
                <Upload.Dragger>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ fontSize: "64px" }} />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                </Upload.Dragger>
              </div>
              <div style={{ textAlign: "right", marginTop: "20px" }}>
                <button
                  className="bg-[#549b90] border-1 border-black hover:bg-gray-400 font-bold py-2 px-4 rounded-full shadow-md"
                  onClick={handlePreviousButtonClick}
                >
                  Previous
                </button>{" "}
                <button
                  className="bg-[#549b90] border-1 border-black hover:bg-gray-400 font-bold py-2 px-4 rounded-full shadow-md"
                  onClick={handleNextButtonClick}
                >
                  Next
                </button>
              </div>
            </TabPane>
            <TabPane
              tab={
                isMobile ? (
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <FaCheck style={{ marginRight: "8px" }} />
                  </span>
                ) : (
                  "Terms and Conditions"
                )
              }
              key="3"
            >
              <div
                className="font-roboto"
                style={{ textAlign: "left", padding: "20px" }}
              >
                <h1 style={{ fontSize: "20px" }}>User Terms and Conditions</h1>
                <h4 style={{ fontSize: "20px" }}>
                  By clicking "Accept" you agree to our website{" "}
                  <a href="/terms-conditions" style={{ color: "#549b90" }}>
                    {" "}
                    Terms and Conditions{" "}
                  </a>
                  as described in our policy.
                </h4>
                <div style={{ paddingLeft: "0px" }}>
                  <label
                    style={{
                      display: "block",
                      marginTop: "30px",
                      marginBottom: "30px",
                      fontSize: "20px",
                    }}
                  >
                    <input type="checkbox" />
                    &nbsp;I agree to the Terms and Conditions.
                  </label>
                </div>
                <div style={{ textAlign: "right", marginTop: "20px" }}>
                  <button
                    className="bg-[#549b90] border-1 border-black hover:bg-gray-400 font-bold py-2 px-4 rounded-full shadow-md"
                    onClick={handlePreviousButtonClick}
                  >
                    Previous
                  </button>{" "}
                  {/* Add Previous button */}
                  <button className="bg-[#549b90] border-1 border-black hover:bg-gray-400 font-bold py-2 px-4 rounded-full shadow-md">
                    Post
                  </button>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </Content>
    </Layout>
  );
};

export default UserPostPage;
