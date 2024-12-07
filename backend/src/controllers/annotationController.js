const { createAnnotation } = require("../services/annotationService");
const { getAnnotationsByModelId } = require("../services/annotationService");
const { getAnnotationsBySceneId } = require("../services/annotationService");
const { updateAnnotation } = require("../services/annotationService");
const { deleteAnnotation } = require("../services/annotationService");

const createAnnotationController = async (req, res) => {

  try {
    const annotation = await createAnnotation(req.body);
    res.status(201).json(annotation.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create annotation" });
  }
};

const getAnnotationsByModelIdController = async (req, res) => {
  try {
    const { modelId } = req.params;
    const annotations = await getAnnotationsByModelId(
      modelId
    );
    res.status(200).json(annotations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve annotations" });
  }
};

const deleteAnnotationController = async (req, res) => {
  try {
    const { id } = req.params;
    const annotation = await deleteAnnotation(id);
    res.status(200).json(annotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete annotation" });
  }
};

const updateAnnotationController = async (req, res) => {
  try {
    const { id } = req.params;
    const annotation_text = req.body;
    
    const annotation = await updateAnnotation(id, annotation_text);
    res.status(200).json(annotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update annotation" });
  }
};


const getAnnotationsBySceneIdController = async (req, res) => {
  try {
    const { sceneId } = req.params;
    const annotations = await getAnnotationsBySceneId(sceneId);
    res.status(200).json(annotations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve annotations" });
  }
};

module.exports = { createAnnotationController, getAnnotationsByModelIdController, 
  getAnnotationsBySceneIdController, deleteAnnotationController, updateAnnotationController };
