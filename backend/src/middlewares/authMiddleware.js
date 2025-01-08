const jwt = require("jsonwebtoken");

// authenticate user
exports.authenticateUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    // Access token from cookies
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Attach user info to request
    next(); // Continue to the next middleware
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// authorize user
exports.authorizeUser = (req, res, next) => {
  const userRole = req.user.role; // Assuming `role` is part of the user payload in the token

  if (userRole !== "admin" && userRole !== "editor") {
    return res
      .status(403)
      .json({ message: "Access denied. Insufficient permissions." });
  }

  next();
};
