const r2Client = require("../config/r2Config");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const axios = require("axios");
require("dotenv").config();

const { MODEL_BASE_URL } = require("../config/config.js");

const uploadToR2 = async (file) => {
  
  const bucketName = process.env.R2_BUCKET_NAME;
  const bucketId = process.env.R2_BUCKET_ID;
  const key = `models/${Date.now()}-${file.originalname}`; // Unique key for the file
  console.log("key", key);

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  await r2Client.send(new PutObjectCommand(params));
  return `https://pub-${bucketId}.r2.dev/${key}`;
};


const getModelsBySceneId = async (sceneId) => {
  try {
    const response = await axios.get(`${MODEL_BASE_URL}/${sceneId}`, sceneId);
    // console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching models:", error);
    throw error;
  }
};

module.exports = { uploadToR2, getModelsBySceneId };
