const {
  getPostLike,
  likePost,
  checkLike,
} = require("../controllers/likeController");
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/like_blog", likePost);
router.get("/blog_likes", getPostLike);
router.get("/isliked", authenticateUser, checkLike);
module.exports = router;
