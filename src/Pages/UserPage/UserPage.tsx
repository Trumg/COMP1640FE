import React, { useState, useEffect } from "react";
import { Layout, Card, Input, Button } from "antd";
import UserNavbar from "../../Components/Navbar/UserNavbar/UserNavbar";
import { FaArrowUp } from "react-icons/fa";
import { ref, onValue, set } from "firebase/database";
import { database, auth } from "../../Firebase/firebase";

const { Content } = Layout;

interface Post {
  id: string;
  title: string;
  content: string;
  displayName: string;
  photoURL: string;
  email: string;
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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
        }}
      >
        <UserNavbar />
      </div>
      <Content
        style={{
          padding: "24px 48px 0",
          flexGrow: 1,
          overflowY: "auto",
          marginLeft: isMobileView ? 0 : "25%",
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
                post.title
              )
            }
            key={post.id}
          >
            {editingPostId === post.id ? (
              <Input.TextArea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            ) : (
              <p>{post.content}</p>
            )}
            <p>Posted by: {post.displayName}</p>
            <p>Email: {post.email}</p>
            <img src={post.photoURL} alt="User Photo" />
            {canEdit(post) ? (
              editingPostId === post.id ? (
                <>
                  <Button onClick={saveChanges}>Save</Button>
                  <Button onClick={cancelEditing}>Cancel</Button>
                </>
              ) : (
                <Button
                  onClick={() =>
                    startEditing(post.id, post.title, post.content)
                  }
                >
                  Edit
                </Button>
              )
            ) : null}
          </Card>
        ))}
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
  );
};

export default UserPage;
