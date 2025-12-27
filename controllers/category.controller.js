const Category = require("../models/Category");

/**
 * Create Category (Admin Only)
 */
exports.createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name)
    return res.status(400).json({ message: "Category name is required" });

  const slug = name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/--+/g, "-");

  const exists = await Category.findOne({ slug });
  if (exists)
    return res.status(409).json({ message: "Category already exists" });

  const category = await Category.create({
    name,
    slug,
  });

  res.status(201).json({
    message: "Category created successfully",
    category,
  });
};

/**
 * Get all categories
 */
exports.getCategories = async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({
    createdAt: -1,
  });

  res.json(categories);
};

/**
 * Update category
 */
exports.updateCategory = async (req, res) => {
  const { name, isActive } = req.body;

  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });

  if (name) {
    category.name = name;
    category.slug = name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-");
  }

  if (isActive !== undefined) category.isActive = isActive;

  await category.save();

  res.json({
    message: "Category updated",
    category,
  });
};

/**
 * Delete category
 */
exports.deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });

  await category.deleteOne();
  res.json({ message: "Category deleted" });
};
