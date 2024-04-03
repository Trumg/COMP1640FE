import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Tabs,
  Upload,
  Spin,
  Table,
  Button,
  Space,
  Tag,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { FaUpload } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import AdminNavbar from "../../../Components/Navbar/AdminNavbar/AdminNavbar";
import { ref, onValue, update, remove } from "firebase/database";
import { database } from "../../../Firebase/firebase";

const { Content } = Layout;
const { TabPane } = Tabs;

interface Post {
  postId: string;
  title: string;
  content: string;
  status: "pending" | "approved" | "rejected";
}

const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    document.body.style.backgroundColor = "transparent";
    const updateMediaQuery = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    updateMediaQuery();
    window.addEventListener("resize", updateMediaQuery);
    return () => {
      document.body.style.backgroundColor = "";
      window.removeEventListener("resize", updateMediaQuery);
    };
  }, []);

  useEffect(() => {
    const fetchPosts = () => {
      const postsRef = ref(database, "posts");
      onValue(postsRef, (snapshot) => {
        const posts: Post[] = [];
        snapshot.forEach((childSnapshot) => {
          const post = childSnapshot.val();
          posts.push({ ...post, postId: childSnapshot.key });
        });
        setPosts(posts);
      });
    };

    fetchPosts();

    // Cleanup
    return () => {
      // Remove listeners if needed
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

  const handleApprove = (postId: string) => {
    // Update the post status to "approved"
    const postRef = ref(database, `posts/${postId}`);
    onValue(postRef, (snapshot) => {
      const post = snapshot.val();
      if (post) {
        update(postRef, { status: "approved" })
          .then(() => {
            // Handle success
            console.log("Post approved successfully");
          })
          .catch((error) => {
            // Handle error
            console.error("Error approving post:", error);
          });
      } else {
        console.error("Post not found");
      }
    });
  };

  const handleReject = (postId: string) => {
    // Remove the post
    const postRef = ref(database, `posts/${postId}`);
    onValue(postRef, (snapshot) => {
      const post = snapshot.val();
      if (post) {
        remove(postRef)
          .then(() => {
            // Handle success
            console.log("Post rejected successfully");
          })
          .catch((error) => {
            // Handle error
            console.error("Error rejecting post:", error);
          });
      } else {
        console.error("Post not found");
      }
    });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "approved" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: Post) => (
        <Space size="middle">
          {record.status === "pending" && (
            <>
              <Button
                type="primary"
                onClick={() => handleApprove(record.postId)}
              >
                Approve
              </Button>
              <Button
                type="primary"
                onClick={() => handleReject(record.postId)}
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      ),
    },
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
                      <span>Posts</span>
                    </span>
                  )
                }
                key="1"
              >
                <div style={{ zIndex: 2, width: "100%", height: "320px" }}>
                  <Table
                    columns={columns}
                    dataSource={posts}
                    pagination={{ pageSize: 5 }}
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
