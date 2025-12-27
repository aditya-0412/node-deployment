const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const orderCtrl = require("../controllers/order.controller");

router.post("/", auth, orderCtrl.createOrder);
router.get("/", auth, orderCtrl.getOrders);
router.get("/:id", auth, orderCtrl.getOrderById);

module.exports = router;
