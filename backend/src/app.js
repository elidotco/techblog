// env congifuration
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
// cors
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true, // Allow cookies or Authorization headers
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blog", require("./routes/blogRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/likes", require("./routes/likeRoute"));
module.exports = app;
