
import AdminHeader from "../../../Components/Header/AdminHeader/AdminHeader";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import "./AdminLayout.css"; // Import CSS
import { useState } from "react";


function AdminLayout() {
  const [newsList, setNewsList] = useState([
    { id: 1, title: "Bản tin 1", content: "Nội dung bản tin 1" },
    { id: 2, title: "Bản tin 2", content: "Nội dung bản tin 2" },
    { id: 3, title: "Bản tin 3", content: "Nội dung bản tin 3" }
  ]);

  const handleEdit = (id: number) => {
    // Xử lý chỉnh sửa bản tin
    console.log(`Chỉnh sửa bản tin có id: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Xử lý xóa bản tin
    console.log(`Xóa bản tin có id: ${id}`);
    setNewsList(newsList.filter(news => news.id !== id));
  };

  const handleAccept = (id: number) => {
    // Xử lý chấp nhận bản tin
    console.log(`Chấp nhận bản tin có id: ${id}`);
  };

  return (
    <div>
      <AdminHeader />
      <div className="container">
        <Typography variant="h4" gutterBottom>
          Danh sách bản tin
        </Typography>
        {newsList.map(news => (
          <Card key={news.id} className="newsCard">
            <CardContent>
              <Typography variant="h6" component="div">
                {news.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {news.content}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleEdit(news.id)}>Chỉnh sửa</Button>
              <Button size="small" onClick={() => handleDelete(news.id)}>Xóa</Button>
              <Button size="small" onClick={() => handleAccept(news.id)}>Chấp nhận</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AdminLayout;
