const { default: axios, get } = require("axios");
const { SCENE_BASE_URL } = require("../config/config.js");

const createScene = async (sceneData) => {
  try {
    // console.log("annotationData", annotationData);
    const response = await axios.post(`${SCENE_BASE_URL}`, sceneData);

    // console.log("response.data", response);
    return response;
  } catch (error) {
    console.error("Error Creating Scene!:", error);
    throw error;
  }
};

const getScenes = async () => {
  try {
    const response = await axios.get(`${SCENE_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching scenes:", error);
    throw error;
  }
};

module.exports = {
  createScene,
  getScenes,
};
