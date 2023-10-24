const router = require("express").Router();
const {
  addItemToWatchlist,
  removeItemFromWatchlist,
  getAllItemsInWatchlist,
  getWatchlistItemByName,
} = require("../Controllers/UserController");
const {
  Signup,
  Login,
  Logout,
  getUserProfile,
  updateUserProfile,
} = require("../Controllers/AuthController.js");
const protect = require("../Middlewares/AuthMiddleware.js");

router.post("/register", Signup);
router.post("/login", Login);
router.post("/logout", Logout);


router.get("/profile", protect ,  getUserProfile);
router.put("/profile", protect , updateUserProfile);
router.get("/watchlist/", protect,getAllItemsInWatchlist);
router.post("/watchlist/add", protect,addItemToWatchlist); // Use userVerification middleware here
router.post("/watchlist/remove", protect,removeItemFromWatchlist);
router.get("/watchlist/item", protect,getWatchlistItemByName);

module.exports = router;
