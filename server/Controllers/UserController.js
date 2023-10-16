const WatchlistModel = require("../models/WatchlistModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");



/**
 * Add an item to the watchlist.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The function does not return anything.
 */
const addItemToWatchlist = asyncHandler(async (req, res) => {
  // Get the user ID from the request
  const userId = req.user._id;

  // Get the item details from the request body
  const { name, TMDB_ID, Type, image, dateAdded } = req.body;

  try {
    // Find the user's watchlist
    let watchlist = await WatchlistModel.findOne({ userId });

    // If the watchlist doesn't exist, create a new one
    if (!watchlist) {
      watchlist = new WatchlistModel({ userId, watchlistItems: [] });
    }

    // Check if an item with the same name already exists in the watchlist
    const existingItem = watchlist.watchlistItems.find(item => item.TMDB_ID === TMDB_ID);
    if (existingItem) {
      return res.status(400).json({ success: false, error: "Item already exists" });
    }

    // Create a new watchlist item
    const newItem = {
      name,
      TMDB_ID,
      Type,
      image,
      dateAdded,
      createdAt: Date.now(),
    };

    // Add the new item to the watchlist
    watchlist.watchlistItems.push(newItem);

    // Save the updated watchlist
    await watchlist.save();

    res.status(200).json({ success: true, watchlist });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


/**
 * Remove an item from the watchlist.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The function does not return anything.
 */
const removeItemFromWatchlist = async (req, res) => {
  const { TMDB_ID } = req.body;
  const userId = req.user._id;

  try {
    
    let watchlist = await WatchlistModel.findOne({ userId });

    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    const itemIndex = watchlist.watchlistItems.findIndex(
      (item) => item.TMDB_ID === TMDB_ID
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ message: "Item not found in the watchlist" });
    }

    watchlist.watchlistItems.splice(itemIndex, 1);
    await watchlist.save();

    res.status(200).json({ message: "Item removed from watchlist", watchlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing item from watchlist" });
  }
};

// Get all items in the watchlist

const getAllItemsInWatchlist = async (req, res) => {
  const userId = req.user._id;

  try {
    const watchlist = await WatchlistModel.findOne({ userId });

    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    const watchlistItems = watchlist.watchlistItems;

    res.status(200).json({ message: "All items in watchlist", watchlistItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving watchlist items" });
  }
};

// Get a watchlist item by name
const getWatchlistItemByName = async (req, res) => {
  const {TMDB_ID} = req.body;
  const userId = req.user._id;
  
  try {
    

    const watchlist = await WatchlistModel.findOne({ userId });

    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    // Find the watchlist item by its name
    const item = watchlist.watchlistItems.find(
      (item) => item.TMDB_ID === TMDB_ID
    );

    if (!item) {
      return res
        .status(404)
        .json({ message: "Item not found in the watchlist" });
    }

    res.status(200).json({ message: "Item found", item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving watchlist item" });
  }
};

module.exports = {
  addItemToWatchlist,
  removeItemFromWatchlist,
  getAllItemsInWatchlist,
  getWatchlistItemByName,
};
