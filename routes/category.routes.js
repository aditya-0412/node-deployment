const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const categoryCtrl = require("../controllers/category.controller");

// Public
router.get("/", categoryCtrl.getCategories);

// Admin only
router.post("/", auth, role("admin"), categoryCtrl.createCategory);
router.patch("/:id", auth, role("admin"), categoryCtrl.updateCategory);
router.delete("/:id", auth, role("admin"), categoryCtrl.deleteCategory);

module.exports = router;
