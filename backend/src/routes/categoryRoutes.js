const router = require("express").Router();

const {
  getAllCategories,
  createCategory,
} = require("../controllers/categoryController");
const {
  authenticateUser,
  authorizeUser,
} = require("../middlewares/authMiddleware");

router.get("/", getAllCategories);
router.post("/create", authenticateUser, authorizeUser, createCategory);

module.exports = router;
