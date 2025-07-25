const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: [true, "postId is required"],
    },
  },
  { timestamps: true }
);

LikeSchema.index({ userId: 1, postId: 1 }, { unique: true });

module.exports = mongoose.model("Like", LikeSchema);
