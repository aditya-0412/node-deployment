const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");
const productCtrl = require("../controllers/product.controller");

router.get("/", productCtrl.getProducts);
router.get("/:id", productCtrl.getProduct);

router.post(
  "/",
  auth,
  role("admin"),
  upload.array("images", 5),
  productCtrl.createProduct
);

router.put(
  "/:id",
  auth,
  role("admin"),
  upload.array("images", 5),
  productCtrl.updateProduct
);

router.delete("/:id", auth, role("admin"), productCtrl.deleteProduct);

module.exports = router;
