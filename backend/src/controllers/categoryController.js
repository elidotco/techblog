const Category = require("../models/categoryModel");

exports.getAllCategories = async (req, res) => {
  try {
    // return only name of categories
    const categories = await Category.find().select("name");
    res.json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create Category
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = new Category({
      name,
      description,
    });
    await newCategory.save();
    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    await Category.findByIdAndUpdate(req.params.id, { name });
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
