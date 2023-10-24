const mongoose = require("mongoose");

const WatchlistItemSchema = new mongoose.Schema({
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
    required: [true, "The type is required"],
  },
  image: {
    type: String,
    required: [false, "The item image URL is required"],
  },
  dateAdded: {
    type: Date,
    required: [true, "The item release date is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const WatchlistSchema = new mongoose.Schema({
  userId: String,
  watchlistItems: [WatchlistItemSchema],
});

const WatchlistModel = mongoose.model("watchlist", WatchlistSchema);

module.exports = WatchlistModel;
