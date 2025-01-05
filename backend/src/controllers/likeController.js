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
