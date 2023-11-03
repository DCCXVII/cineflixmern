const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "The item name is required"],
    },
    name: {
      type: String,
      required: [true, "The item name is required"],
    },
    tmdb_id: {
      type: String,
      required: [true, "The id is required"],
    },
    type: {
      type: String,
      enum: ["movie", "series", "tv_episode"],
      required: [true, "The type is required"],
    },
    image: {
      type: String,
      required: [false, "The item image URL is required"],
    },
  },
  {
    timestamps: true,
  }
);

const FavoriteModel = mongoose.model("Favorites", FavoriteSchema);

module.exports = FavoriteModel;
