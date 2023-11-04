const FavoriteModel = require("../models/FavoriteModel");
const asyncHandler = require("express-async-handler");

const getFavorites = asyncHandler(async (req, res) => {
  try {
    const favorites = await FavoriteModel.find({ userId: req.user._id });
    // res.status(200).json(favorites);
    res.status(200).json(
      favorites.map((favorite) => ({
        tmdb_id: favorite.tmdb_id,
        name: favorite.name,
        type: favorite.type,
        image: favorite.image,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const addFavorite = asyncHandler(async (req, res) => {
  const { tmdb_id, name, type, image } = req.body;
  const { _id: userId } = req.user;

  const favorite = new FavoriteModel({
    userId,
    name,
    tmdb_id,
    type,
    image,
  });

  try {
    const existsfavorite = await FavoriteModel.findOne({ userId, tmdb_id });
    if (existsfavorite) {
      return res.status(400).json({ message: "Already exists" });
    }

    const newFavorite = await favorite.save();
    res.status(200).json(newFavorite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
const deleteFavorite = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const tmdb_id = req.body.tmdb_id;
  try {
    const favorite = await FavoriteModel.findOne({ userId, tmdb_id });
    if (!favorite) return res.status(404).json({ message: "Not found" });

    await favorite.deleteOne();
    res.status(200).json(favorite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getFavorites,
  addFavorite,
  deleteFavorite,
};
