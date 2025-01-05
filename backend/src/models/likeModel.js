const mongoose = require("mongoose");

// like Schema
const likeSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
