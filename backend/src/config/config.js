require("dotenv").config();

const ANNOTATION_TOOL_PORT = process.env.ANNOTATION_TOOL_PORT;
const ANNOTATION_SERVICE_PORT = process.env.ANNOTATION_SERVICE_PORT;

const MODEL_BASE_URL = `http://localhost:${ANNOTATION_SERVICE_PORT}/models`;
const ANNOTATION_BASE_URL = `http://localhost:${ANNOTATION_SERVICE_PORT}/annotations`;
const SCENE_BASE_URL = `http://localhost:${ANNOTATION_SERVICE_PORT}/scenes`;
const ANNOTATION_TOOL_URL = `http://localhost:${ANNOTATION_TOOL_PORT}`;

module.exports = { MODEL_BASE_URL, ANNOTATION_BASE_URL, SCENE_BASE_URL, ANNOTATION_TOOL_URL };
