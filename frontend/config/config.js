import { config } from "dotenv";
config(); // Loads environment variables from a .env file into process.env

const PORT = process.env.NEXT_PUBLIC_PORT; // Use a default port if PORT is not defined

const MODEL_BASE_URL = `http://localhost:${PORT}/api/models`;
const ANNOTATION_BASE_URL = `http://localhost:${PORT}/api/annotations`;
const SCENE_BASE_URL = `http://localhost:${PORT}/api/scenes`;
const SOCKET_BASE_URL = `http://localhost:${PORT}`;

module.exports = {
    MODEL_BASE_URL,
    ANNOTATION_BASE_URL,
    SCENE_BASE_URL,
    SOCKET_BASE_URL,
};
