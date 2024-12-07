const express = require("express");
const upload = require("../middleware/modelUpload");
const { uploadModel } = require("../controllers/r2Controller");
const { getModelsController } = require("../controllers/r2Controller");
const { getModelController } = require("../controllers/r2Controller");
const { deleteModelController } = require("../controllers/r2Controller");
const { getModelsBySceneIdController } = require("../controllers/r2Controller");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadModel);
router.get("/", getModelsController);
router.get("/:sceneId", getModelsBySceneIdController);
router.get("/:id", getModelController);
router.delete("/:id", deleteModelController);

module.exports = router;
