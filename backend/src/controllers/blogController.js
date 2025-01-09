const Blog = require("../models/blogModel");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("createdBy", "name");
    res.json(blogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Post a blog

exports.postBlog = async (req, res) => {
  const { title, description, markdown, image, category, createdBy, slug } =
    req.body;
  try {
    const newBlog = new Blog({
      title,
      description,
      markdown,
      image,
      slug,
      category,
      createdBy,
    });
    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Get a blog by id
exports.getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    res.json(blog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get blog by category name
exports.getBlogByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const blogs = await Blog.find({
      category: category,
    }).populate("createdBy", "name");
    res.json(blogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
