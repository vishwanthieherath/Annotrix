const express = require("express");
const { createAnnotationController } = require("../controllers/annotationController");
const { getAnnotationsByModelIdController } = require("../controllers/annotationController");
const { getAnnotationsBySceneIdController } = require("../controllers/annotationController");
// const { getAnnotation } = require("../controllers/annotationController");
const { deleteAnnotationController } = require("../controllers/annotationController");
const { updateAnnotationController } = require("../controllers/annotationController");

const router = express.Router();

router.post("/", createAnnotationController);
router.get("/:modelId", getAnnotationsByModelIdController);
router.get("/:sceneId", getAnnotationsBySceneIdController);
// router.get("/:id", getAnnotation);
router.delete("/:id", deleteAnnotationController);
router.put("/:id", updateAnnotationController);

module.exports = router;
