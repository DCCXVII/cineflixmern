const mongoose = require("mongoose");

const FavoritelistItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The item name is required"],
    },
    TMDB_ID: {
      type: String,
      required: [true, "The id is required"],
    },
    Type: {
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

const FavoritelistSchema = new mongoose.Schema({
  userId: String,
  FavoritelistItems: [FavoritelistItemSchema],
});

const FavoritelistModel = mongoose.model("Favoritelist", FavoritelistSchema);

module.exports = FavoritelistModel;
