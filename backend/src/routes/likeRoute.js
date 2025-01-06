const { getPostLike, likePost } = require("../controllers/likeController");
console.log("likePost function:", likePost);
const router = require("express").Router();

router.post("/like_blog", likePost);
router.get("/blog_likes", getPostLike);
module.exports = router;
