import React from "react";
import { Layout, Card, Input } from "antd";
import UserPostNavbar from "../../../Components/Navbar/UserNavbar/UserPostNavbar";

const { Content } = Layout;

const UserPostPage: React.FC = () => {
  return (
    <Layout>
      <UserPostNavbar />
      <Content
        style={{
          padding: "50px",
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="max-w-md w-full">
          <Card className="shadow-md rounded-md">
            <Input.TextArea
              placeholder="Write your post here"
              autoSize={{ minRows: 4, maxRows: 6 }}
              className="border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            <div className="flex justify-end mt-2">
              <button className="bg-[#549b90] border-1 border-black hover:bg-gray-400 font-bold py-2 px-4 rounded-full shadow-md text-sm">
                Post
              </button>
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default UserPostPage;
