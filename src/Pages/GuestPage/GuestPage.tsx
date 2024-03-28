import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";

const GuessPage: React.FC = () => {
  const [topics, setTopics] = useState<any[]>([]); // Khai báo state để lưu trữ danh sách topic

  useEffect(() => {
    // Sử dụng Axios để gửi yêu cầu GET đến backend để lấy danh sách topic
    axios.get("YOUR_BACKEND_API_URL/topics")
      .then(response => {
        // Xử lý dữ liệu nhận được từ backend
        setTopics(response.data);
      })
      .catch(error => {
        // Xử lý lỗi khi gửi yêu cầu đến backend
        console.error("Error fetching topics:", error);
      });
  }, []); // useEffect sẽ chạy một lần sau khi component được render

  return (
    <div>
      <Navbar />
      <div>
        {/* Hiển thị danh sách topic */}
        {topics.map(topic => (
          <div key={topic.id}>
            <h3>{topic.title}</h3>
            <p>{topic.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuessPage;
