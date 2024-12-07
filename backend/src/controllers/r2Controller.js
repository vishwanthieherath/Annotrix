const { default: axios, get } = require("axios");
const { uploadToR2 } = require("../services/r2Service");
const { getModelsBySceneId } = require("../services/r2Service");
const { MODEL_BASE_URL } = require("../config/config");

async function uploadModel(req, res) {
  try {
    const file = req.file;
    const sceneId = req.body.scene_id;

    console.log("file", req.file);
    console.log("scene_id", req.body.scene_id);

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const r2Path = await uploadToR2(file);

    // Pass to FastAPI backend for database storage
    const modelInfo = {
      model_name: file.originalname,
      file_path: r2Path,
      scene_id: sceneId
    };

    // Send the model info to FastAPI
    const response = await fetch(`${MODEL_BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modelInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("FastAPI Error:", errorData);
      return res.status(response.status).json(errorData);
    }

    const result = await response.json();
    res.status(200).json(result);

  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: "Upload failed" });
  }
}


const getModelsController = async (req, res) => {
  try {
    // Send the model info to FastAPI
    const response = await axios.get(`${MODEL_BASE_URL}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("FastAPI Error:", errorData);
      return res.status(response.status).json(errorData);
    }

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};

const getModelController = async (req, res) => {};

const deleteModelController = async (req, res) => {};

const getModelsBySceneIdController = async (req, res) => {
  // console.log("req", req.params);

  try {
    const { sceneId } = req.params;
    const models = await getModelsBySceneId(sceneId);
    res.status(200).json(models);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve models" });
  }
};

module.exports = {
  uploadModel,
  getModelsController,
  getModelController,
  deleteModelController,
  getModelsBySceneIdController,
};
