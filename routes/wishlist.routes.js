const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const wishlistCtrl = require("../controllers/wishlist.controller");

router.get("/", auth, wishlistCtrl.getWishlist);
router.post("/toggle", auth, wishlistCtrl.toggleWishlist);

module.exports = router;
