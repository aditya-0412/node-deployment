const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("./s3Client");

exports.uploadToS3 = async (file) => {
  if (!file) throw new Error("File is required");

  const key = `uploads/${Date.now()}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3Client.send(command);

  // Return RAW S3 URL (NOT signed)
  return `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};
