const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide post title"],
      maxlength: 60,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide the User"],
    },
    caption: {
      type: String,
      default: "",
      trim: true,
      maxlength: 256,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    hashtags: {
      type: [String],
      default: [],
      set: (tags) => [
        ...new Set(
          tags
            .filter((tag) => typeof tag === "string")
            .map((tag) => tag.trim().replace(/^#/, ""))
        ),
      ],
      validate: {
        validator: function (tags) {
          return tags.every((tag) => /^[a-zA-Z0-9]+$/.test(tag));
        },
        message: "Hashtags can only contain letters and numbers",
      },
    },
    category: {
      type: String,
      enum: [
        "tech",
        "sports",
        "gaming",
        "music",
        "fashion",
        "art",
        "food",
        "travel",
        "memes",
        "lifestyle",
        "personal",
        "social",
        "news",
        "event",
        "happening",
      ],
      default: "social",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
