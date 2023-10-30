const FavoritelistModel = require("../models/FavoritelistModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

/**
 * Add an item to the favorite.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The function does not return anything.
 */
const addItemToFavorite = asyncHandler(async (req, res) => {
  // Get the user ID from the request
  const userId = req.user._id;

  // Get the item details from the request body
  const { name, TMDB_ID, Type, image } = req.body;

  try {
    // Find the user's favorite
    let favorite = await FavoritelistModel.findOne({ userId });

    // If the favorite doesn't exist, create a new one
    if (!favorite) {
      favorite = new FavoritelistModel({ userId, FavoritelistItems: [] });
    }

    // Check if an item with the same TMDB_ID already exists in the favorite
    const existingItemIndex = favorite.FavoritelistItems.findIndex(
      (item) =>
        item.TMDB_ID === TMDB_ID &&
        item.Type === Type &&
        item.name === name &&
        item.image === image
    );
    if (existingItemIndex !== -1) {
      return res
        .status(400)
        .json({ success: false, error: "Item already exists", exists: true });
    }

    // Create a new favorite item
    const newItem = {
      name,
      TMDB_ID,
      Type,
      image,
    };

    // Add the new item to the favorite
    favorite.FavoritelistItems.push(newItem);

    // Save the updated favorite
    await favorite.save();

    res.status(200).json({ success: true, favorite, exists: true });

    // Save the updated favorite
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Remove an item from the favorite.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The function does not return anything.
 */
const removeItemFromFavorite = async (req, res) => {
  const { TMDB_ID } = req.body;
  const userId = req.user._id;

  try {
    let favorite = await FavoritelistModel.findOne({ userId });

    if (!favorite) {
      return res.status(404).json({ message: "favorite not found" });
    }

    const itemIndex = favorite.FavoritelistItems.findIndex(
      (item) => item.TMDB_ID === TMDB_ID
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ message: "Item not found in the favorite" });
    }

    favorite.FavoritelistItems.splice(itemIndex, 1);
    await favorite.save();

    res.status(200).json({
      message: "Item removed from favorite",
      favorite,
      exists: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing item from favorite" });
  }
};

// Get all items in the favorite

const getAllItemsInfavorite = async (req, res) => {
  const userId = req.user._id;

  try {
    const favorite = await FavoritelistModel.findOne({ userId });

    if (!favorite) {
      return res.status(404).json({ message: "favorite not found" });
    }

    const FavoritelistItems = favorite.FavoritelistItems;

    res
      .status(200)
      .json({ message: "All items in favorite", FavoritelistItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving favorite items" });
  }
};

// Get a favorite item by name
const getfavoriteItemByName = async (req, res) => {
  const { TMDB_ID } = req.body;
  const userId = req.user._id;

  try {
    const favorite = await FavoritelistModel.findOne({ userId });

    if (!favorite) {
      return res.status(404).json({ message: "favorite not found" });
    }

    // Find the favorite item by its name
    const item = favorite.FavoritelistItems.find(
      (item) => item.TMDB_ID === TMDB_ID
    );

    if (!item) {
      return res
        .status(404)
        .json({ message: "Item not found in the favorite" });
    }

    res.status(200).json({ message: "Item found", item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving favorite item" });
  }
};

exports.createFavoritelist = async (req, res) => {
  try {
    const { userId, FavoritelistItems } = req.body;
    const favoritelist = await FavoritelistModel.create({
      userId,
      FavoritelistItems,
    });
    res.status(201).json(favoritelist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFavoritelistByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const favoritelist = await FavoritelistModel.findOne({ userId });
    if (!favoritelist) {
      return res.status(404).json({ message: "Favoritelist not found" });
    }
    res.status(200).json(favoritelist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateFavoritelist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { FavoritelistItems } = req.body;
    const favoritelist = await FavoritelistModel.findOneAndUpdate(
      { userId },
      { FavoritelistItems },
      { new: true }
    );
    if (!favoritelist) {
      return res.status(404).json({ message: "Favoritelist not found" });
    }
    res.status(200).json(favoritelist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFavoritelist = async (req, res) => {
  try {
    const { userId } = req.params;
    const favoritelist = await FavoritelistModel.findOneAndDelete({ userId });
    if (!favoritelist) {
      return res.status(404).json({ message: "Favoritelist not found" });
    }
    res.status(200).json({ message: "Favoritelist deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addItemToFavorite,
  removeItemFromFavorite,
  getAllItemsInfavorite,
  getfavoriteItemByName,
};
