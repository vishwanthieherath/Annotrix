const express = require("express");
const cors = require("cors");

const modelRoutes = require("./src/routes/r2Route");
const annotationRoutes = require("./src/routes/annotationRoute");
const sceneRoutes = require("./src/routes/sceneRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/models", modelRoutes);
app.use("/api/annotations", annotationRoutes);
app.use("/api/scenes", sceneRoutes);

module.exports = app;

