const { default: axios, get } = require("axios");
const { ANNOTATION_BASE_URL } = require("../config/config.js");

const createAnnotation = async (annotationData) => {
  
  try {
    // console.log("annotationData", annotationData);
    const response = await axios.post(`${ANNOTATION_BASE_URL}`, annotationData);

    // console.log("response.data", response);
    return response;

  } catch (error) {

    console.error("Error Creating Annotation!:", error);
    throw error;
  }
};

const deleteAnnotation = async (id) => {
  try {
    const response = await axios.delete(`${ANNOTATION_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting annotation:", error);
    throw error;
  }
};


const updateAnnotation = async (id, annotationText) => {
  try {
    
    const response = await axios.put(`${ANNOTATION_BASE_URL}/${id}`, annotationText);
    return response.data;
  } catch (error) {
    console.error("Error updating annotation:", error);
    throw error;
  }
};

const getAnnotationsByModelId = async (modelId) => {
  try {
    const response = await axios.get(`${ANNOTATION_BASE_URL}/${modelId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching annotations:", error);
    throw error;
  }
};

const getAnnotationsBySceneId = async (sceneId) => {
  try {
    const response = await axios.get(`${ANNOTATION_BASE_URL}/${sceneId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching annotations:", error);
    throw error;
  }
};

module.exports = {
  createAnnotation,
  getAnnotationsByModelId,
  getAnnotationsBySceneId,
  deleteAnnotation,
  updateAnnotation
};
