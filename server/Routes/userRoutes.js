const router = require("express").Router();
const {
  getFavorites,
  addFavorite,
  deleteFavorite,
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

router.get("/favorite-list", protect, getFavorites);
router.post("/favorite-list/add", protect, addFavorite);
router.post("/favorite-list/remove", protect, deleteFavorite);

router.get("/comment/", getComments);
router.post("/comment/add", protect, createComment);
router.put("/comment/update", protect, updateComment);
router.post("/comment/remove", protect, deleteComment);

module.exports = router;
