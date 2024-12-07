const { createScene } = require("../services/sceneService");
const { getScenes } = require("../services/sceneService");

const createSceneController = async (req, res) => {
  try {
    const scene = await createScene(req.body);
    res.status(201).json(scene.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create scene" });
  }
};

const getScenesController = async (req, res) => {
  try {
    
    const scenes = await getScenes();
    res.status(200).json(scenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve scenes" });
  }
};

module.exports = {
  createSceneController,
  getScenesController,
};
