import React, { useEffect, useState } from "react";
import { Layout, Card, Input, Tabs, Upload, Spin } from "antd";
import UserPostNavbar from "../../../Components/Navbar/UserNavbar/UserPostNavbar";
import { InboxOutlined } from "@ant-design/icons";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaUpload } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { ref, set, push, serverTimestamp } from "firebase/database";
import { auth, database, storage } from "../../../Firebase/firebase"; // Import storage
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  UploadTask,
} from "firebase/storage";
import { UploadFile } from "antd/lib/upload/interface"; // Import UploadFile type

const { Content } = Layout;
const { TabPane } = Tabs;

const UserPostPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<UploadFile<any> | null>(null); // Use UploadFile type

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

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleUpload = async () => {
    if (!file || !file.originFileObj) {
      alert("Please select a file to upload.");
      return;
    }
    setUploading(true);
    setUploadSuccess(false);

    // Create a storage reference
    const storageRefInstance = storageRef(storage, `uploads/${file.name}`); // Use storageRef with storage instance

    // Upload file
    const uploadTask: UploadTask = uploadBytesResumable(
      storageRefInstance,
      file.originFileObj
    );

    // Listen for state changes, errors, and completion of the upload
    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.error("Error uploading:", error);
        alert("Failed to upload. Please try again later.");
        setUploading(false);
      },
      () => {
        // Upload completed successfully, get download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploading(false);
          setUploadSuccess(true);
          // Now you can use the downloadURL to store it in the database along with other data
          // For example, you can add it to the postData object
          const currentUser = auth.currentUser;
          if (currentUser) {
            const postData = {
              title,
              content,
              email: currentUser.email || "user@example.com",
              displayName: currentUser.displayName || "Anonymous",
              photoURL: currentUser.photoURL || "default-photo-url",
              createdAt: serverTimestamp(),
              status: "pending",
              fileUrl: downloadURL, // Add the file URL to the postData object
            };
            const postsRef = ref(database, "posts");
            const newPostRef = push(postsRef);

            set(newPostRef, postData)
              .then(() => {
                // Instead of redirecting, show a notification to the user
                alert("Post submitted for review.");
                // Optionally, clear the form fields
                setTitle("");
                setContent("");
              })
              .catch((error) => {
                console.error("Error posting:", error);
                alert("Failed to post. Please try again later.");
              });
          } else {
            alert("Please sign in to post.");
          }
        });
      }
    );
  };

  const handleTermsAgreementChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAgreedToTerms(event.target.checked);
  };

  const handlePostButtonClick = () => {
    if (agreedToTerms) {
      if (title && content) {
        handleUpload();
      } else {
        alert("Please fill in title and content before posting.");
      }
    } else {
      alert("Please agree to the Terms and Conditions before posting.");
    }
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Content"
                      className="border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      autoSize={{ minRows: 12, maxRows: 12 }}
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
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        zIndex: 2,
                        width: "100%",
                        maxHeight: "300px",
                        overflowY: "auto",
                        flex: 1,
                      }}
                    >
                      <Upload.Dragger
                        style={{
                          width: "100%",
                          padding: "20px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px dashed #549b90",
                          borderRadius: "8px",
                        }}
                        fileList={file ? [file] : []}
                        customRequest={({ file: uploadedFile }) => {
                          // Rename 'file' to 'uploadedFile'
                          if (uploadedFile instanceof File) {
                            setFile({
                              uid: Math.random().toString(),
                              name: uploadedFile.name,
                              status: "done",
                              size: uploadedFile.size,
                              type: uploadedFile.type,
                              percent: 100,
                              originFileObj: uploadedFile,
                            });
                          }
                        }}
                      >
                        {uploading && !uploadSuccess && <Spin />}
                        {uploadSuccess && (
                          <p style={{ color: "green" }}>Upload Successful!</p>
                        )}
                        {!uploading && !uploadSuccess && (
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
                      <input
                        type="checkbox"
                        onChange={handleTermsAgreementChange}
                      />
                      &nbsp;I agree to the Terms and Conditions.
                    </label>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <button
                      className={`bg-[#549b90] border-1 border-black hover:bg-gray-400 font-bold py-2 px-4 rounded-full shadow-md ${
                        agreedToTerms ? "" : "bg-red-700 cursor-not-allowed"
                      }`}
                      onClick={handlePostButtonClick}
                      disabled={!agreedToTerms}
                    >
                      Post
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

export default UserPostPage;
