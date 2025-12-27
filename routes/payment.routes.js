const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const paymentCtrl = require("../controllers/payment.controller");

router.post("/create-intent", auth, paymentCtrl.createIntent);

router.post(
  "/webhook",
  require("express").raw({ type: "application/json" }),
  paymentCtrl.stripeWebhook
);

module.exports = router;
