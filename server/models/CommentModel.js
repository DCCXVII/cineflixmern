const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: String,
    username: String,
    TMDB_ID: {
      type: String,
      required: [true, "The id is required"],
    },
    content: {
      type: String,
      required: [true, "The content is required"],
    },
    Type: {
      type: String,
      enum: ["movie", "series", "tv_episode"],
      required: [true, "The type is required"],
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("Comment", CommentSchema);
module.exports = CommentModel;
