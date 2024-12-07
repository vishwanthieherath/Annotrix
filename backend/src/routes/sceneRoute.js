const express = require("express");
const { createSceneController } = require("../controllers/sceneController");
const { getScenesController } = require("../controllers/sceneController");
// const { getAnnotation } = require("../controllers/annotationController");
// const { deleteAnnotation } = require("../controllers/annotationController");

const router = express.Router();

router.post("/", createSceneController);
router.get("/", getScenesController);
// router.get("/:id", getAnnotation);
// router.delete("/:id", deleteAnnotation);

module.exports = router;