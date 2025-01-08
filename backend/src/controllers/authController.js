const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// helper functions to generate token
const generateAccseeToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
};

// helper functions to generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

// Register
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, role });
    // Save the user to the database
    await newUser.save();
    return res.status(201).json({ message: "User created  successfully" });

    // login the new user in
  } catch (err) {
    console.log(err.message);
  } finally {
    console.log("Register");
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate access token and refresh token
    const accessToken = generateAccseeToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token in the cookie
    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // True if in production
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    res.cookie("token", accessToken, {
      httpOnly: false,
      secure: false, // True if in production
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000, // 30 days
      path: "/",
    });

    // Return the access token to the client
    return res.status(200).json({ accessToken });
  } catch (err) {
    console.error("Error during login:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    console.log("Login process completed");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("refreshtoken"); // Clear cookie on logout
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
exports.refreshToken = (req, res) => {
  const rf_token = req.cookies.refreshtoken; // Get refresh token from cookies

  if (!rf_token) {
    return res.status(400).json({ message: "Please login or register" });
  }

  // Verify the refresh token
  jwt.verify(rf_token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      console.error("Refresh Token Verification Error:", err);
      return res.status(400).json({ message: "Please login or register" });
    }

    // Generate a new access token
    const accessToken = generateAccseeToken({ _id: user.id, role: user.role }); // Include user ID or other payload

    // Set the new access token in an HTTPOnly cookie
    res.cookie("token", accessToken, {
      httpOnly: true, // Prevent JavaScript access to the cookie
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "Strict", // Restrict cookie usage to same-site requests
      maxAge: 30 * 60 * 1000, // 30 minutes
      path: "/", // Accessible throughout the app
    });

    // Send success response
    res.status(200).json({ accessToken }); // Optional: Send token in response for debugging
  });
};

exports.getProfile = async (req, res) => {
  if (req.user) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  }
};
