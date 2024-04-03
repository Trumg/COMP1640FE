import React, { useState, useEffect } from "react";
import { Layout, Card, Button, Popover, Modal, Input, Avatar } from "antd";
import { FaArrowUp, FaRegComment } from "react-icons/fa";
import useToken from "../../Hooks/useToken";
import { message } from "antd";
import {
  ref,
  onValue,
  set,
  remove,
  push,
  serverTimestamp,
  update,
} from "firebase/database";
import { database, auth } from "../../Firebase/firebase";
import { FaLocationArrow } from "react-icons/fa";
import { MdOutlineEdit, MdDelete, MdCancel } from "react-icons/md";
import { BiSave } from "react-icons/bi";
import UserNavbar from "../../Components/Navbar/UserNavbar/UserNavbar";

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
  comments?: Comment[];
}

interface CustomUser {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface Comment {
  id: string;
  content: string;
  displayName: string;
  photoURL: string;
  email: string; // Add the email property
  createdAt: number;
}

const UserPage: React.FC = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<CustomUser | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // Adding the missing state
  const [editedCommentContent, setEditedCommentContent] = useState<string>("");

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

  const addComment = (postId: string) => {
    if (currentUser) {
      const commentRef = ref(database, `comments/${postId}`);
      const newCommentRef = push(commentRef);
      set(newCommentRef, {
        content: newComment,
        displayName: currentUser.displayName!,
        photoURL: currentUser.photoURL!,
        email: currentUser.email!,
        createdAt: serverTimestamp(),
      })
        .then(() => {
          message.success("Comment added successfully");
          setNewComment(""); // Clear the input field after successful addition
        })
        .catch((error) => {
          message.error("Failed to add comment: " + error.message);
        });
    }
  };

  const editComment = (postId: string, commentId: string, content: string) => {
    if (currentUser) {
      const commentRef = ref(database, `comments/${postId}/${commentId}`);
      update(commentRef, {
        content: content,
      })
        .then(() => {
          message.success("Comment edited successfully");
          setEditingCommentId(null);
          setEditedCommentContent("");
        })
        .catch((error) => {
          message.error("Failed to edit comment: " + error.message);
        });
    }
  };

  const deleteComment = (postId: string, commentId: string) => {
    const commentRef = ref(database, `comments/${postId}/${commentId}`);
    remove(commentRef)
      .then(() => {
        message.success("Comment deleted successfully");
      })
      .catch((error) => {
        message.error("Failed to delete comment: " + error.message);
      });
  };

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL || "",
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
      const promises: Promise<void>[] = []; // Array to hold promises for fetching comments
      snapshot.forEach((childSnapshot) => {
        const postData = { id: childSnapshot.key, ...childSnapshot.val() };
        // Fetch only approved posts
        if (postData.status === "approved") {
          postsData.push(postData);
          const commentRef = ref(database, `comments/${postData.id}`);
          // Create a promise to fetch comments for each post and add it to the array
          const promise = new Promise<void>((resolve) => {
            onValue(commentRef, (commentSnapshot) => {
              const commentsData: Comment[] = [];
              commentSnapshot.forEach((commentChildSnapshot) => {
                commentsData.push({
                  id: commentChildSnapshot.key,
                  ...commentChildSnapshot.val(),
                });
              });
              postData.comments = commentsData;
              resolve(); // Resolve the promise once comments are fetched and added to the post
            });
          });
          promises.push(promise);
        }
      });
      // Wait for all promises to resolve before updating the state with postsData
      Promise.all(promises).then(() => {
        setPosts(postsData);
      });
    });

    return () => {
      unsubscribeAuth();
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
      update(postRef, {
        title: editedTitle,
        content: editedContent,
      })
        .then(() => {
          message.success("Post edited successfully");
          cancelEditing();
        })
        .catch((error) => {
          message.error("Failed to edit post: " + error.message);
        });
    }
  };

  const confirmDelete = (postId: string) => {
    confirm({
      title: "Do you want to delete this post?",
      onOk() {
        remove(ref(database, `posts/${postId}`))
          .then(() => {
            message.success("Post deleted successfully");
          })
          .catch((error) => {
            message.error("Failed to delete post: " + error.message);
          });
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

  const openModal = (post: Post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

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
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
                      {/* Render the number of comments */}
                      {isMobileView ? (
                        // Render menu icon for mobile view
                        <Popover placement="bottomRight" trigger="click">
                          <Button
                            type="link"
                            onClick={() => openModal(post)}
                            icon={
                              <FaRegComment
                                style={{
                                  color: "#549b90",
                                  fontSize: "18px",
                                }}
                              />
                            }
                          />
                          {post.comments ? post.comments.length : 0}
                        </Popover>
                      ) : (
                        // Render action buttons for desktop view
                        <div style={{ display: "flex" }}>
                          <Button
                            type="link"
                            onClick={() => openModal(post)}
                            icon={
                              <FaRegComment
                                style={{
                                  color: "#549b90",
                                  fontSize: "18px",
                                }}
                              />
                            }
                          />
                          {post.comments ? post.comments.length : 0}
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
                        <BiSave />
                      </Button>
                      <Button
                        style={{ color: "#549b90" }}
                        onClick={cancelEditing}
                      >
                        <MdCancel />
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
                        <MdOutlineEdit />
                      </Button>
                      <Button
                        style={{ color: "#549b90" }}
                        onClick={() => confirmDelete(post.id)}
                      >
                        <MdDelete />
                      </Button>
                    </>
                  )
                ) : null}
              </Card>
            ))}

            {/* Modal to display selected post */}
            <Modal
              title={null}
              visible={selectedPost !== null}
              onCancel={closeModal}
              footer={null}
              closable={false}
              width={800} // Set the width of the modal
              bodyStyle={{ overflowY: "auto", maxHeight: "80vh" }} // Set the maximum height of the modal body
            >
              {selectedPost && (
                <Card
                  title={
                    <>
                      <span>Comment</span>
                    </>
                  }
                  bodyStyle={{ overflowY: "auto", maxHeight: "70vh" }}
                >
                  {/* Comment section */}
                  <div style={{ marginTop: "20px" }}>
                    {selectedPost.comments &&
                      selectedPost.comments.map((comment) => (
                        <div
                          key={comment.id}
                          style={{
                            marginBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Avatar src={comment.photoURL} />
                          <div style={{ marginLeft: "10px", flex: 1 }}>
                            <span>
                              {comment.displayName} -{" "}
                              {formatTimeDifference(comment.createdAt)}:
                            </span>
                            <p>{comment.content}</p>
                          </div>
                          {currentUser &&
                            currentUser.email === comment.email && (
                              <div>
                                {editingCommentId === comment.id ? (
                                  <div style={{ display: "flex" }}>
                                    <Input
                                      style={{ marginLeft: "8px" }}
                                      value={editedCommentContent}
                                      onChange={(e) =>
                                        setEditedCommentContent(e.target.value)
                                      }
                                    />
                                    <Button
                                      style={{ marginLeft: "8px" }}
                                      onClick={() =>
                                        editComment(
                                          selectedPost.id,
                                          comment.id,
                                          editedCommentContent
                                        )
                                      }
                                      title="Save changes"
                                    >
                                      <BiSave />
                                    </Button>
                                    <Button
                                      style={{ marginLeft: "8px" }}
                                      onClick={() => setEditingCommentId(null)}
                                      title="Cancel editing"
                                    >
                                      <MdCancel />
                                    </Button>
                                  </div>
                                ) : (
                                  <div>
                                    <Button
                                      style={{ marginLeft: "8px" }}
                                      onClick={() => {
                                        setEditingCommentId(comment.id);
                                        setEditedCommentContent(
                                          comment.content
                                        );
                                      }}
                                      title="Edit comment"
                                    >
                                      <MdOutlineEdit />
                                    </Button>
                                    <Button
                                      style={{ marginLeft: "8px" }}
                                      onClick={() =>
                                        deleteComment(
                                          selectedPost.id,
                                          comment.id
                                        )
                                      }
                                      title="Delete comment"
                                    >
                                      <MdDelete />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                        </div>
                      ))}
                    <Input
                      placeholder="Add a comment"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onPressEnter={() => addComment(selectedPost.id)}
                      suffix={
                        <button
                          className="bg-[#549b90] border-1 border-black hover:bg-gray-400 font-bold py-2 px-4 rounded-full shadow-md"
                          onClick={() => addComment(selectedPost.id)}
                          disabled={!newComment.trim()}
                          title="Post comment"
                        >
                          <FaLocationArrow />
                        </button>
                      }
                    />
                  </div>
                </Card>
              )}
            </Modal>
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
