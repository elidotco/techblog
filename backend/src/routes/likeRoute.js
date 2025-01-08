const { getPostLike, likePost } = require("../controllers/likeController");

const router = require("express").Router();

router.post("/like_blog", likePost);
router.get("/blog_likes", getPostLike);
module.exports = router;
