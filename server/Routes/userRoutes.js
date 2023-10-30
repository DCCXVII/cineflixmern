const router = require("express").Router();
const {
  addItemToFavorite,
  removeItemFromFavorite,
  getAllItemsInfavorite,
  getfavoriteItemByName,
} = require("../Controllers/FavoriteListController");
const {
  Signup,
  Login,
  Logout,
  getUserProfile,
  updateUserProfile,
} = require("../Controllers/AuthController.js");
const {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const protect = require("../Middlewares/AuthMiddleware.js");

router.post("/register", Signup);
router.post("/login", Login);
router.post("/logout", Logout);

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.get("/favoritelist/", protect, getAllItemsInfavorite);
router.post("/favoritelist/add", protect, addItemToFavorite); // Use userVerification middleware here
router.post("/favoritelist/remove", protect, removeItemFromFavorite);
router.get("/favoritelist/item", protect, getfavoriteItemByName);

router.post("/comments", protect, createComment);
router.get("/comments/:TMDB_ID", getComments);
router.put("/comments/:id", protect, updateComment);
router.delete("/comments/:id", protect, deleteComment);

module.exports = router;
