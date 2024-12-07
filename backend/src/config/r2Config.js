const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

const r2Client = new S3Client({
  endpoint: process.env.R2_BUCKET_ENDPOINT, // Your R2 endpoint
  region: "auto", // R2 uses "auto" region
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID, // R2 Access Key ID
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY, // R2 Secret Access Key
  },
});

module.exports = r2Client;
