const jwt = require("jsonwebtoken");

// authenticate user
exports.authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(400).json({ message: "Invalid Authentication" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        return res
          .status(400)
          .json({ message: `${err} Invalid Authentication` });

      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
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
