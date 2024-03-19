
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./GuestLayout.css"; 

interface NewsItem {
  id: number;
  title: string;
  content: string;
}

function GuestLayout() {
  const newsList: NewsItem[] = [
    { id: 1, title: "Bản tin 1", content: "Nội dung bản tin 1" },
    { id: 2, title: "Bản tin 2", content: "Nội dung bản tin 2" },
    { id: 3, title: "Bản tin 3", content: "Nội dung bản tin 3" }
  ];

  return (
    <div className="guest-layout-container">
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
              <Button size="small" component={Link} to={`login`}>Xem chi tiết</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default GuestLayout;
