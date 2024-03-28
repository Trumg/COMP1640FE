import React from "react";
import "./TopicCard.css"; // Import CSS

function TopicCard({ title, content }) {
  return (
    <div className="topic-card">
      <h2 className="topic-title">{title}</h2>
      <p className="topic-content">{content}</p>
    </div>
  );
}

export default TopicCard;
