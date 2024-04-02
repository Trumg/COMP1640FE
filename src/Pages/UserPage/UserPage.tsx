import React, { useState, useEffect } from "react";
import { Layout, Card, Button, Popover, Modal, Input, Avatar } from "antd";
import UserNavbar from "../../Components/Navbar/UserNavbar/UserNavbar";
import { FaArrowUp, FaArrowDown, FaRegComment } from "react-icons/fa";
import useToken from "../../Hooks/useToken";
import { HiMenuAlt4 } from "react-icons/hi";
import { ref, onValue, set, remove } from "firebase/database";
import { database, auth } from "../../Firebase/firebase";

const { Content } = Layout;
const { confirm } = Modal;

interface Post {
  id: string;
  title: string;
  content: string;
  displayName: string;
  photoURL: string;
  email: string;
  createdAt: number;
}

interface CustomUser {
  displayName: string | null;
  email: string | null;
}

const UserPage: React.FC = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<CustomUser | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>("");

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

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        setCurrentUser(null);
      }
    });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();

    const postsRef = ref(database, "posts");
    onValue(postsRef, (snapshot) => {
      const postsData: Post[] = [];
      snapshot.forEach((childSnapshot) => {
        postsData.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setPosts(postsData);
    });

    return () => {
      unsubscribeAuth();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const canEdit = (post: Post) => {
    return currentUser && currentUser.email === post.email;
  };

  const startEditing = (postId: string, title: string, content: string) => {
    setEditingPostId(postId);
    setEditedTitle(title);
    setEditedContent(content);
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setEditedTitle("");
    setEditedContent("");
  };

  const saveChanges = () => {
    if (editingPostId) {
      const postRef = ref(database, `posts/${editingPostId}`);
      set(postRef, {
        ...posts.find((post) => post.id === editingPostId),
        title: editedTitle,
        content: editedContent,
      });
      cancelEditing();
    }
  };

  const confirmDelete = (postId: string) => {
    confirm({
      title: "Do you want to delete this post?",
      onOk() {
        remove(ref(database, `posts/${postId}`));
      },
      onCancel() {},
    });
  };

  const formatTimeDifference = (timestamp: number): string => {
    const now = Date.now();
    const diffInMs = now - timestamp;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);

    if (diffInMinutes < 1) {
      return "just now";
    } else if (diffInMinutes === 1) {
      return "1 minute ago";
    } else if (diffInHours < 1) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours === 1) {
      return "1 hour ago";
    } else if (diffInDays < 1) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays === 1) {
      return "1 day ago";
    } else if (diffInWeeks < 1) {
      return `${diffInDays} days ago`;
    } else if (diffInWeeks === 1) {
      return "1 week ago";
    } else {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    }
  };

  const popoverContent = (
    <div>
      <Button
        type="link"
        icon={<FaArrowUp style={{ color: "#549b90", fontSize: "14px" }} />}
      />
      <Button
        type="link"
        icon={<FaArrowDown style={{ color: "#549b90", fontSize: "14px" }} />}
      />
      <Button
        type="link"
        icon={<FaRegComment style={{ color: "#549b90", fontSize: "14px" }} />}
      />
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Navbar */}
      <div
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
        }}
      >
        <UserNavbar />
      </div>

      {/* Main content */}
      <Layout style={{ marginTop: "80px" }}>
        <Content
          style={{
            padding: "24px 48px 0",
            flexGrow: 1,
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            {posts.map((post) => (
              <Card
                title={
                  editingPostId === post.id ? (
                    <Input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {isMobileView ? (
                        // Render title without image in mobile view
                        <p style={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            size={24}
                            src={post.photoURL}
                            style={{ marginRight: "10px" }}
                          />
                          {formatTimeDifference(post.createdAt)}
                        </p>
                      ) : (
                        // Render title with image in desktop view
                        <p style={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            size="large"
                            src={post.photoURL}
                            style={{ marginRight: "10px" }}
                          />
                          {post.displayName} -{" "}
                          {formatTimeDifference(post.createdAt)}
                        </p>
                      )}
                      {isMobileView ? (
                        // Render menu icon for mobile view
                        <Popover
                          placement="bottomRight"
                          content={popoverContent}
                          trigger="click"
                        >
                          <Button
                            type="link"
                            icon={
                              <HiMenuAlt4
                                style={{
                                  color: "#549b90",
                                  fontSize: "14px",
                                }}
                              />
                            }
                          />
                        </Popover>
                      ) : (
                        // Render action buttons for desktop view
                        <div style={{ display: "flex" }}>
                          <Button
                            type="link"
                            icon={
                              <FaArrowUp
                                style={{
                                  color: "#549b90",
                                  fontSize: "18px",
                                  marginRight: "8px",
                                }}
                              />
                            }
                          />
                          <Button
                            type="link"
                            icon={
                              <FaArrowDown
                                style={{
                                  color: "#549b90",
                                  fontSize: "18px",
                                  marginRight: "8px",
                                }}
                              />
                            }
                          />
                          <Button
                            type="link"
                            icon={
                              <FaRegComment
                                style={{
                                  color: "#549b90",
                                  fontSize: "18px",
                                }}
                              />
                            }
                          />
                        </div>
                      )}
                    </div>
                  )
                }
                bordered={true}
                hoverable={true}
                style={{
                  width: isMobileView ? "350px" : "800px",
                  height: "300px",
                  marginBottom: "25px",
                }}
                key={post.id}
              >
                {editingPostId === post.id ? (
                  <Input.TextArea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                ) : (
                  <div>
                    <p>{post.title}</p>
                    <p>{post.content}</p>
                  </div>
                )}

                {canEdit(post) ? (
                  editingPostId === post.id ? (
                    <>
                      <Button
                        style={{ marginRight: "8px", color: "#549b90" }}
                        onClick={saveChanges}
                      >
                        Save
                      </Button>
                      <Button
                        style={{ color: "#549b90" }}
                        onClick={cancelEditing}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        style={{ marginRight: "8px", color: "#549b90" }}
                        onClick={() =>
                          startEditing(post.id, post.title, post.content)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        style={{ color: "#549b90" }}
                        onClick={() => confirmDelete(post.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )
                ) : null}
              </Card>
            ))}
          </div>
          {/* Scroll to top button */}
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
    </Layout>
  );
};

export default UserPage;
