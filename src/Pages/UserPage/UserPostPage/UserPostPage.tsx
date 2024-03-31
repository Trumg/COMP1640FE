import React, { useEffect, useRef } from "react";
import { Layout, Card, Input } from "antd";
import UserPostNavbar from "../../../Components/Navbar/UserNavbar/UserPostNavbar";

const { Content } = Layout;

const UserPostPage: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
              autoSize={{ minRows: 15, maxRows: 20 }}
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
        </Card>
      </Content>
    </Layout>
  );
};

export default UserPostPage;
