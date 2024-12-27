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
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
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
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    // generate access token and refresh token
    const accessToken = generateAccseeToken(user);
    const refreshToken = generateRefreshToken(user);
    //  set refresh token in the cookie
    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    // return the access token and refresh token to the client
    return res.status(200).json({ accessToken });
  } catch (err) {
    console.log(err.message);
  } finally {
    console.log("Login");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("refreshtoken"); // Clear cookie on logout
  res.status(200).json({ message: "Logged out successfully" });
};

exports.refreshToken = (req, res) => {
  const rf_token = req.cookies.refreshtoken;
  if (!rf_token) {
    return res.status(400).json({ message: "Please login or register" });
  }
  jwt.verify(rf_token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Please login or register" });
    }
    const accessToken = generateAccseeToken(user);
    res.status(200).json({ accessToken });
  });
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};
