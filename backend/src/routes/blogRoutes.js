const router = require("express").Router();

const { getAllBlogs, postBlog } = require("../controllers/blogController");
const {
  authorizeUser,
  authenticateUser,
} = require("../middlewares/authMiddleware");

router.get("/", getAllBlogs);
router.post("/add-post", authenticateUser, authorizeUser, postBlog);

module.exports = router;
