const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const cartCtrl = require("../controllers/cart.controller");

router.get("/", auth, cartCtrl.getCart);
router.post("/add", auth, cartCtrl.addToCart);
router.patch("/update", auth, cartCtrl.updateCartItem);
router.delete("/remove/:productId", auth, cartCtrl.removeItem);
router.delete("/clear", auth, cartCtrl.clearCart);

module.exports = router;
