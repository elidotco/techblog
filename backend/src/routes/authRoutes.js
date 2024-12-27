const router = require("express").Router();

const {
  register,
  login,
  logout,
  refreshToken,
  getProfile,
} = require("../controllers/authController");
const { authenticateUser } = require("../middlewares/authMiddleware");

router.post("/register", register); // Register new users
router.post("/login", login); // login  users
router.post("/logout", logout); // logout  users
// refresh token route
router.post("/refresh_token", refreshToken);
router.get("/profile", authenticateUser, getProfile);

module.exports = router;
