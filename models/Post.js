const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide post title"],
      maxlength: 50,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide the User"],
    },
    category: {
      type: String,
      enum: ["Movies", "Social", "Fashion", "Industry", "Art", "Happenings"],
      default: "Social",
    },
    likes: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 120,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
