require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../models/categoryModel"); // Adjust path to your Category model

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Database connected!");

    const categories = [
      {
        name: "Technology",
        description: "All about the latest tech trends and updates.",
      },
      {
        name: "Health",
        description: "Tips and insights for a healthier lifestyle.",
      },
      {
        name: "Education",
        description:
          "Guidance and updates about education systems and learning.",
      },
      {
        name: "Lifestyle",
        description:
          "Inspiration for daily living, including fashion and wellness.",
      },
      {
        name: "Business",
        description: "News and tips about the business world and startups.",
      },
      {
        name: "Travel",
        description: "Exploration guides and travel tips for adventurers.",
      },
      {
        name: "Food",
        description: "Delicious recipes, food trends, and restaurant reviews.",
      },
      {
        name: "Sports",
        description: "Updates on sports events, teams, and players.",
      },
      {
        name: "Finance",
        description: "Financial tips and advice for managing money.",
      },
      {
        name: "Entertainment",
        description: "Movies, TV shows, and pop culture insights.",
      },
    ];

    await Category.insertMany(categories);
    console.log("Categories inserted successfully!");
    process.exit();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
