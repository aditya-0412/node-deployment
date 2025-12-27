const Product = require("../models/Product");
const { paginate } = require("../utils/pagination");
const { uploadToS3 } = require("../utils/s3");
const { uploadImageFromUrl } = require("../utils/uploadFromUrl");
const signProductImages = require("../utils/signProductImages");

exports.createProduct = async (req, res) => {
  const images = [];

  if (req.files?.length) {
    for (const file of req.files) {
      images.push(await uploadToS3(file));
    }
  }

  if (Array.isArray(req.body.images)) {
    for (const url of req.body.images) {
      if (url.startsWith("http")) {
        images.push(await uploadImageFromUrl(url));
      }
    }
  }

  const product = await Product.create({
    ...req.body,
    images,
  });

  res.status(201).json(product);
};

exports.getProducts = async (req, res) => {
  const result = await paginate(Product, {}, req);
  result.data = await Promise.all(
    result?.data?.map((p) => signProductImages(p.toObject ? p.toObject() : p))
  );

  res.json(result);
};

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(await signProductImages(product));
};

exports.updateProduct = async (req, res) => {
  const images = [];

  if (req.files?.length) {
    for (const file of req.files) {
      images.push(await uploadToS3(file));
    }
  }

  if (Array.isArray(req.body.images)) {
    for (const url of req.body.images) {
      if (url.startsWith("http")) {
        images.push(await uploadImageFromUrl(url));
      }
    }
  }

  const updateData = { ...req.body };
  if (images.length) updateData.images = images;

  const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });

  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
