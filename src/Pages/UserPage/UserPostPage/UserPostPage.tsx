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
        }}
      >
        <Card
          className="shadow-md rounded-md"
          style={{
            width: "100%",
            maxWidth: "1000px",
            maxHeight: "100%",
          }}
        >
          <div>
            <Input.TextArea
              ref={textareaRef}
              placeholder="Enter title"
              className="border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              autoSize={{ minRows: 1, maxRows: 1 }}
              style={{ marginBottom: "20px" }}
              onInput={handleTextareaResize}
            />
          </div>
          <div>
            <Input.TextArea
              placeholder="Write your post here"
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
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default UserPostPage;
