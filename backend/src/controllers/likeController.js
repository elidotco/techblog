const Like = require("../models/likeModel");

exports.getPostLike = async (req, res) => {
  const { postId } = req.query;

  // Validate input
  if (!postId) {
    return res.status(400).json({
      success: false,
      message: "postId and userId are required",
    });
  }

  try {
    // Query the database
    const like = await Like.countDocuments({ postId });

    // Respond with the results
    res.status(200).json({
      success: true,
      data: like,
    });
  } catch (err) {
    console.error(err.message);

    // Respond with an error message
    res.status(500).json({
      success: false,
      message: "Server error. Could not fetch post likes.",
    });
  }
};

exports.likePost = async (req, res) => {
  const { postId, userId } = req.query;

  // Check if the user is authenticated
  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User not logged in" });
  }

  try {
    // Check if the user has already liked the post
    const existingLike = await Like.findOne({ postId, userid: userId });

    if (!existingLike) {
      // If not liked yet, create and save a new like
      const newLike = new Like({ postId, userid: userId });
      await newLike.save();
      return res.status(201).json({ done: 1 });
    } else {
      // If already liked, remove the like
      await Like.findByIdAndDelete(existingLike._id);
      return res.status(200).json({ done: 0 });
    }
  } catch (err) {
    console.error("Error liking/unliking post:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// this is to check if the user has already likeed the post this should run on load
exports.checkLike = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.query;

  try {
    const existingLike = await Like.findOne({ postId, userid: userId });
    if (existingLike) {
      return res.status(201).json({ done: 1 });
    } else return res.status(201).json({ done: 0 });
  } catch (err) {
    console.log(err);
  }
};
