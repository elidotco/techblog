require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("../models/blogModel"); // Adjust the path based on your project structure
const slugify = require("slugify");
// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

// Seed data function
const seedBlogs = async () => {
  // Category IDs you provided
  const categoryIds = [
    "677947e53ba0edf0bf1a28bb",
    "677947e53ba0edf0bf1a28be",
    "677947e53ba0edf0bf1a28c1",
    "677947e53ba0edf0bf1a28bd",
    "677947e53ba0edf0bf1a28ba",
    "677947e53ba0edf0bf1a28bc",
    "677947e53ba0edf0bf1a28c0",
    "677947e53ba0edf0bf1a28c2",
    "677947e53ba0edf0bf1a28bf",
    "677947e53ba0edf0bf1a28c3",
    "67795e9ca43480ee8dcf18ed",
    "67796290470db429bebe8899",
  ];

  const createdBy = "676cb1dcd53d678d65613349"; // Updated createdBy ID

  // Generate blogs for each category
  const blogs = [];
  categoryIds.forEach((categoryId) => {
    for (let i = 1; i <= 3; i++) {
      const title = `Sample Blog Title ${i} for Category ${categoryId}`;
      blogs.push({
        title,
        description: `This is a sample description for blog ${i} in category ${categoryId}.`,
        markdown: `# Blog Content ${i}\n\nThis is the markdown content for blog ${i} in category ${categoryId}.`,
        image: `https://via.placeholder.com/600x400?text=Category+${categoryId}+Blog+${i}`,
        slug: slugify(`${title}-${i}`, { lower: true, strict: true }),
        category: categoryId,
        createdBy,
      });
    }
  });

  try {
    // Clear existing blogs (optional)
    await Blog.deleteMany();

    // Insert new blogs
    const insertedBlogs = await Blog.insertMany(blogs);
    console.log(`${insertedBlogs.length} blogs inserted successfully!`);
  } catch (error) {
    console.error("Error seeding blogs:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

// Connect to database and seed
connectDB().then(() => seedBlogs());
