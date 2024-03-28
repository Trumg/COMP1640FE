import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagerPage: React.FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts'); // Thay đổi đường dẫn API tương ứng
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } 
  };

  const handleEdit = async (postId: number) => {
    // Xử lý chỉnh sửa bài đăng
    console.log(`Chỉnh sửa bài đăng có id: ${postId}`);
  };

  const handleDelete = async (postId: number) => {
    // Xử lý xóa bài đăng
    console.log(`Xóa bài đăng có id: ${postId}`);
    try {
      await axios.delete(`/api/posts/${postId}`); // Thay đổi đường dẫn API tương ứng
      fetchPosts(); // Lấy lại danh sách bài đăng sau khi xóa
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h1>Manager Page</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <p>{post.title}</p>
            <p>{post.content}</p>
            <button onClick={() => handleEdit(post.id)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerPage;
