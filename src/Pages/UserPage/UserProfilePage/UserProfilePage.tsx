import React, { useEffect, useRef, useState } from "react";
import { Layout, Card, Input, Tabs, Upload, Spin } from "antd";
import UserPostNavbar from "../../../Components/Navbar/UserNavbar/UserPostNavbar";
import { InboxOutlined } from "@ant-design/icons";
import { FaUpload } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import TabPane from "antd/es/tabs/TabPane";

const { Content } = Layout;

const UserProfilePage: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploadSuccess(true);
      setActiveTab("3");
    }, 2000);
  };

  return (
    <Layout>
      <UserPostNavbar />
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
                      <span>Ideas</span>
                    </span>
                  )
                }
                key="1"
              >
                <div>
                  <div style={{ zIndex: 2, width: "100%", height: "320px" }}>
                    <Input.TextArea
                      ref={textareaRef}
                      placeholder="Title"
                      className="border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      autoSize={{ minRows: 1, maxRows: 1 }}
                      style={{
                        marginBottom: "20px",
                        border: "1px solid #549b90",
                        borderRadius: "8px",
                      }}
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
                        border: "1px solid #549b90",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
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
                    <FaUpload style={{ fontSize: "24px" }} />
                  ) : (
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <FaUpload style={{ marginRight: "8px" }} />
                      <span>Uploads</span>
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
                </div>
              </TabPane>
              <TabPane
                tab={
                  isMobile ? (
                    <FaCheck style={{ fontSize: "24px" }} />
                  ) : (
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <FaCheck style={{ marginRight: "8px" }} />
                      <span>Policy</span>
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
                  <div style={{ textAlign: "right" }}>
                    <button
                      className="bg-[#549b90] border-1 border-black hover:bg-gray-400 font-bold py-2 px-4 rounded-full shadow-md"
                      onClick={handlePreviousButtonClick}
                    >
                      Previous
                    </button>{" "}
                    <button className="bg-[#549b90] border-1 border-black hover:bg-gray-400 font-bold py-2 px-4 rounded-full shadow-md">
                      Next
                    </button>
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

export default UserProfilePage;
