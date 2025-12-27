const axios = require("axios");
const { uploadToS3 } = require("./s3");

exports.uploadImageFromUrl = async (imageUrl) => {
  const response = await axios.get(imageUrl, {
    responseType: "arraybuffer",
  });

  const file = {
    originalname: imageUrl.split("/").pop(),
    buffer: Buffer.from(response.data),
    mimetype: response.headers["content-type"],
  };

  return uploadToS3(file);
};
