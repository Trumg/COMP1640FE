import express from "express";

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Your API routes
app.get("/api", (_req, res) => {
  // Handle API logic
  res.send("API endpoint response");
});

app.listen(7279, () => {
  console.log("Backend server is running on port 7279");
});
