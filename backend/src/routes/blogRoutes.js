const router = require("express").Router();

const {
  getAllBlogs,
  postBlog,
  getBlogByCategory,
} = require("../controllers/blogController");
const {
  authorizeUser,
  authenticateUser,
} = require("../middlewares/authMiddleware");

router.get("/", getAllBlogs);
router.post("/add-post", authenticateUser, authorizeUser, postBlog);
router.get("/category", getBlogByCategory);

module.exports = router;
