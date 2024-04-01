import React, { useEffect, useState } from "react";
import { Layout, Card, Tabs, Upload, Spin, Table } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { FaUpload } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import TabPane from "antd/es/tabs/TabPane";
import AdminNavbar from "../../../Components/Navbar/AdminNavbar/AdminNavbar";

const { Content } = Layout;

const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

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

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploadSuccess(true);
      setActiveTab("3");
    }, 2000);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  // Sample user data
  const userData = [
    { id: 1, name: "Jane Smith", age: 25, email: "jane@example.com" },
    { id: 2, name: "Jane Smith", age: 25, email: "jane@example.com" },
    { id: 3, name: "Jane Smith", age: 25, email: "jane@example.com" },
    { id: 4, name: "Jane Smith", age: 25, email: "jane@example.com" },
    { id: 5, name: "Jane Smith", age: 25, email: "jane@example.com" },
    { id: 6, name: "Jane Smith", age: 25, email: "jane@example.com" },
    { id: 7, name: "Jane Smith", age: 25, email: "jane@example.com" },
    { id: 8, name: "Jane Smith", age: 25, email: "jane@example.com" },
    { id: 9, name: "Jane Smith", age: 25, email: "jane@example.com" },
    { id: 10, name: "Jane Smith", age: 25, email: "jane@example.com" },
  ];

  return (
    <Layout>
      <AdminNavbar />
      <Content
        className="font-roboto"
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
            height: "500px",
            border: "2px solid #549b90",
            borderRadius: "8px",
          }}
        >
          <Tabs activeKey={activeTab} onChange={handleTabChange} size="large">
            <>
              <TabPane
                tab={
                  isMobile ? (
                    <IoDocumentTextOutline style={{ fontSize: "24px" }} />
                  ) : (
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <IoDocumentTextOutline style={{ marginRight: "8px" }} />
                      <span>Users</span>
                    </span>
                  )
                }
                key="1"
              >
                <div style={{ zIndex: 2, width: "100%", height: "320px" }}>
                  <Table
                    columns={columns}
                    dataSource={userData}
                    scroll={{ x: "max-content" }}
                    pagination={{ pageSize: 5 }}
                    style={{ fontSize: "10px", padding: "0", margin: "0" }}
                  />
                </div>
              </TabPane>
              <TabPane
                tab={
                  isMobile ? (
                    <FaUpload style={{ fontSize: "24px" }} />
                  ) : (
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <FaUpload style={{ marginRight: "8px" }} />
                      <span>Date</span>
                    </span>
                  )
                }
                key="2"
              >
                <div style={{ zIndex: 2 }}>
                  <div
                    style={{
                      width: "100%",
                      height: "300px",
                    }}
                  >
                    <Upload.Dragger
                      showUploadList={false}
                      style={{
                        width: "100%",
                        height: "300px",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px dashed #549b90",
                        borderRadius: "8px",
                      }}
                      beforeUpload={handleUpload}
                    >
                      {uploading && <Spin />}{" "}
                      {/* Show loading spinner while uploading */}
                      {uploadSuccess && ( // Show success message when upload is successful
                        <p style={{ color: "green" }}>Upload Successful!</p>
                      )}
                      {!uploading &&
                        !uploadSuccess && ( // Show drag area when not uploading or after success
                          <>
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined style={{ fontSize: "50px" }} />
                            </p>
                            <p className="ant-upload-text">
                              Click or drag file to this area to upload
                            </p>
                          </>
                        )}
                    </Upload.Dragger>
                  </div>
                </div>
              </TabPane>
              <TabPane
                tab={
                  isMobile ? (
                    <FaCheck style={{ fontSize: "24px" }} />
                  ) : (
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <FaCheck style={{ marginRight: "8px" }} />
                      <span>Topic</span>
                    </span>
                  )
                }
                key="3"
              >
                <div style={{ zIndex: 3 }}>
                  <div
                    style={{
                      width: "100%",
                      height: "320px",
                      alignItems: "center",
                    }}
                  >
                    <h1 style={{ fontSize: "22px" }}>
                      User Terms and Conditions
                    </h1>
                    <h4 style={{ fontSize: "22px" }}>
                      By clicking "Accept" you agree to our website{" "}
                      <a href="/terms-conditions" style={{ color: "#549b90" }}>
                        {" "}
                        Terms and Conditions{" "}
                      </a>
                      as described in our policy.
                    </h4>
                    <label
                      style={{
                        display: "block",
                        fontSize: "22px",
                        marginTop: "20px",
                      }}
                    >
                      <input type="checkbox" />
                      &nbsp;I agree to the Terms and Conditions.
                    </label>
                  </div>
                </div>
              </TabPane>
            </>
          </Tabs>
        </Card>
      </Content>
    </Layout>
  );
};

export default AdminDashboardPage;
