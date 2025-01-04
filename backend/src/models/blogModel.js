// Blog Schema
const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId for referencing
    ref: "Category", // Reference the related collection (replace "Category" with your collection name)
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId for referencing
    ref: "User", // Reference the related collection (replace "User" with your collection name)
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog; // Export the model
