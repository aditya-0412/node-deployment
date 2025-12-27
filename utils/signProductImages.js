const { getSignedUrl } = require("./s3SignedUrl");

module.exports = async function signProductImages(product) {
  if (!product || !Array.isArray(product.images)) {
    return { ...product, images: [] };
  }

  const signedImages = await Promise.all(
    product.images.map((url) => getSignedUrl(url))
  );

  return {
    ...product,
    images: signedImages,
  };
};
