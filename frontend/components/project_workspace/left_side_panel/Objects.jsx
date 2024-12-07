import Image from "next/image";
import add from "@public/assets/icons/add.svg";
import { MODEL_BASE_URL, ANNOTATION_BASE_URL, SCENE_BASE_URL } from "@config/config";

import axios from "axios";

import { useEffect, useState, useContext } from "react";
import { SceneContext } from "@contexts/SceneContext";
import { FileContext } from "@contexts/FileContext";
import { AnnotationContext } from "@contexts/AnnotationContext";
import { get } from "axios";
import upload from "@api/ModelUpload";

const Objects = ({ objects, objectsName }) => {
  const { addScene } = useContext(SceneContext);
  const { setFile } = useContext(FileContext);
  const { addModel } = useContext(SceneContext);
  const { activeScene, setActiveScene } = useContext(SceneContext);
  const { active, setActive } = useContext(SceneContext);
  const { showScenes, setShowScenes } = useContext(SceneContext);
  const { addAnnotation } = useContext(AnnotationContext);
  const { activeModel, setActiveModel } = useContext(SceneContext);
  const { activeAnnotation, setActiveAnnotation } = useContext(SceneContext);

  const [showObjects, setShowObjects] = useState(false);

  const [newScene, setNewScene] = useState(false);

  const handleActive = (id) => {
    setActive(id);
    setNewScene(false);

    if (objectsName === "Scenes") {
      setActiveScene(id);

      localStorage.setItem("activeScene", id);

      // console.log("objectName", objectsName);

      const fetchModels = async (id) => {
        try {
          // Fetch models from the backend
          const response = await axios.get(
            `${MODEL_BASE_URL}/${id}`
          );

          // console.log("Scene Models", response.data);

          const sceneModels = Array.isArray(response.data)
            ? response.data
            : [response.data]; // Ensure data is an array

          addModel(sceneModels); // Add fetched models to state
          // console.log("Scene Models", sceneModels);

          // Retrieve existing models from localStorage
          const existingModels =
            JSON.parse(localStorage.getItem("models")) || [];

          // Merge new models with existing ones, avoiding duplicates
          const updatedModels = [...existingModels];

          sceneModels.forEach((model) => {
            const modelExists = existingModels.some(
              (storedModel) => storedModel.modelId === model.model_id
            );

            if (!modelExists) {
              updatedModels.push({
                fileUrl: model.file_path,
                sceneId: model.scene_id,
                modelId: model.id,
                modelName: model.model_name,
              });
            }
          });

          // Update localStorage with the merged models
          localStorage.setItem("models", JSON.stringify(updatedModels));
        } catch (error) {
          console.error("Error fetching models:", error);
        }
      };

      fetchModels(id);

      const fetchAnnotations = async (id) => {
        try {
          const modelAnnotations = await axios.get(
            `${ANNOTATION_BASE_URL}/${id}`
          ); // Replace with dynamic model_id
          addAnnotation(modelAnnotations.data); // Add fetched annotations to state
        } catch (error) {
          console.error("Error fetching annotations:", error);
        }
      };

      fetchAnnotations(id);
    } else if (objectsName === "Models") {
      setActiveModel(id);
      localStorage.setItem("modelId", id);
    } else if (objectsName === "Annotations") {
      setActiveAnnotation(id);
      localStorage.setItem("annotationId", id);
    }
  };

  const createScene = () => {
    setShowObjects(true);
    setNewScene(true);
  };

  const handleCreateScene = async (e) => {
    let value = "";

    if (e.target.value !== "") {
      value = e.target.value;
    } else {
      window.alert("Please enter a scene name");
      return;
    }

    const response = await axios.post(`${SCENE_BASE_URL}`, {
      scene_name: value,
    });

    setNewScene(false);
    handleActive(response.data.id);

    addScene(response.data);
  };

  const getColumnName = (object) => {
    if (objectsName === "Scenes") {
      return object.scene_name;
    } else if (objectsName === "Models") {
      return object.model_name;
    } else if (objectsName === "Annotations") {
      return object.annotation_text;
    }
  };

  const handleShowObjects = () => {
    if (objectsName === "Scenes") {
      setShowScenes(!showScenes);
    }

    setShowObjects(!showObjects);
  };

  return (
    <div className="w-full px-1 text-xs mb-2">
      <div className="flex justify-between items-center h-6 mb-2 w-full">
        <div className="flex">
          <i
            className={`bi ${
              showObjects ? "bi-chevron-down" : "bi-chevron-right"
            } text-[8px] mr-2 flex items-center text-gray-400`}
            onClick={handleShowObjects}
          ></i>
          <h6>{objectsName}</h6>
        </div>
        {objectsName === "Scenes" && (
          <div
            className="w-[20px] hover:bg-zinc-700 rounded-md cursor-pointer"
            onClick={createScene}
          >
            <Image src={add} alt="" />
          </div>
        )}
      </div>

      {showObjects && (
        <div className="flex ml-1 w-11/12 overflow-y-auto">
          <ul className="ml-1 my-2 w-full">
            {objects.map((object, index) => (
              <li
                key={index}
                className={`pl-2 pr-2 max-w-[145px] w-full py-[5px] mb-2 rounded-lg cursor-pointer overflow-x-scroll scrollbar-none ${
                  object.id === active ? "bg-zinc-800" : "hover:bg-zinc-800"
                }`}
                onClick={() => handleActive(object.id)} // Pass the index to handleActiveScene
              >
                {getColumnName(object)}
              </li>
            ))}
            {newScene && (
              <input
                type="text"
                className="pl-2 w-full py-[5px] mb-2 rounded-lg bg-zinc-800 outline-none border-none"
                placeholder="Enter scene name"
                onKeyDown={(e) => e.key === "Enter" && handleCreateScene(e)}
              />
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Objects;
