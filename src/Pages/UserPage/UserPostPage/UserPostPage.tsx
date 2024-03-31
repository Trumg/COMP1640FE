import React, { useEffect, useRef, useState } from "react";
import { Layout, Card, Input, Tabs, Upload } from "antd";
import UserPostNavbar from "../../../Components/Navbar/UserNavbar/UserPostNavbar";
import { InboxOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { TabPane } = Tabs;

const UserPostPage: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = useState<string>("1");

  useEffect(() => {
    document.body.style.backgroundColor = "transparent";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleTextareaResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
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
          paddingTop: "150px",
          paddingBottom: "20px", // Add padding to create space between the button and content area
        }}
      >
        <Card
          className="shadow-md rounded-md"
          style={{
            width: "100%",
            maxWidth: "1000px",
            maxHeight: "100%",
            position: "relative", // Required for relative positioning
          }}
        >
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Post" key="1">
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
                  autoSize={{ minRows: 12, maxRows: 12 }}
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
                  <button className="bg-[#549b90] border-1 border-black hover:bg-gray-400 font-bold py-2 px-4 rounded-full shadow-md">
                    Next
                  </button>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Upload" key="2">
              <div style={{ zIndex: 2 }}>
                <Upload.Dragger style={{ width: "100%", height: "300px" }}>
                  {" "}
                  {/* Adjust the height here */}
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ fontSize: "64px" }} />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                </Upload.Dragger>
              </div>
              <div style={{ textAlign: "right", marginTop: "20px" }}>
                <button className="bg-[#549b90] border-1 border-black hover:bg-gray-400 font-bold py-2 px-4 rounded-full shadow-md">
                  Next
                </button>
              </div>
            </TabPane>
            <TabPane tab="Categories" key="3">
              <div style={{ zIndex: 3 }}>
                <p>Content of Tab 3</p>
              </div>
            </TabPane>
            <TabPane tab="Terms and Conditions" key="4">
              <div style={{ zIndex: 4 }}>
                <p>Content of Tab 4</p>
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </Content>
    </Layout>
  );
};

export default UserPostPage;
