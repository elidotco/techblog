const Blog = require("../models/blogModel");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Post a blog

exports.postBlog = async (req, res) => {
  const { title, description, markdown, image, category, createdBy } = req.body;
  try {
    const newBlog = new Blog({
      title,
      description,
      markdown,
      image,
      category,
      createdBy,
    });
    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
