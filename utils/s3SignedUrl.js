const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = require("./s3Client");

exports.getSignedUrl = async (s3Url) => {
  const url = new URL(s3Url);
  const key = url.pathname.substring(1);

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: key,
  });

  return getSignedUrl(s3Client, command, {
    expiresIn: 60 * 5, // 5 minutes
  });
};
