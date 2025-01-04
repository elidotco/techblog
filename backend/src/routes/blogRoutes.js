const router = require("express").Router();

const { getAllBlogs } = require("../controllers/blogController");

router.get("/", getAllBlogs);

module.exports = router;
