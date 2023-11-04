const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "The user id is required"],
    },
    name: {
      type: String,
      required: [true, "The user name is required"],
    },
    tmdb_id: {
      type: String,
      required: [true, "The id is required"],
    },
    content: {
      type: String,
      required: [true, "The content is required"],
    },
    type: {
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
