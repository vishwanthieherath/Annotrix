"use client";

import { useContext, useState, useEffect, act } from "react";
import { FileContext, FileProvider } from "@contexts/FileContext";
import { AnnotationContext, AnnotationProvider } from "@contexts/AnnotationContext";
import { SceneContext, SceneProvider } from "@contexts/SceneContext";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import Model from "./Model";
import AnnotationEditor from "../editors/AnnotationEditor";
import Annotations from "./Annotations";

import io from "socket.io-client";
import axios from "axios";
import { SOCKET_BASE_URL, MODEL_BASE_URL, ANNOTATION_BASE_URL } from "@config/config";

const socket = io(`${SOCKET_BASE_URL}`); // Connect to the Socket.IO server

const CanvasArea = () => {

  const { file, setFile } = useContext(FileContext);
  const { annotations, annotationMode, addAnnotation, setAnnotationMode } = useContext(AnnotationContext);
  const { models, activeScene, setActiveScene, addModel } = useContext(SceneContext);
  const { activeModel, setActiveModel } = useContext(SceneContext);
  const { activeAnnotation, setActiveAnnotation } = useContext(SceneContext);

  const [editorVisible, setEditorVisible] = useState(false);
  const [clickedPoint, setClickedPoint] = useState(null);
  const [clickedNormal, setClickedNormal] = useState(null);

  const {commentMode, textMode, mentionMode, dimensionMode, colorPickerMode, moveMode} = useContext(AnnotationContext);

  useEffect(() => {

    if (activeScene == null) return;

    const fetchModels = async () => {
      try {
        const sceneModels = await axios.get(
          `${MODEL_BASE_URL}/${activeScene}`
        ); // Replace with dynamic model_id
        addModel(sceneModels.data); // Add fetched annotations to state
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();


    const fetchAnnotations = async () => {
      try {
        const modelAnnotations = await axios.get(
          `${ANNOTATION_BASE_URL}/${activeScene}`
        ); // Replace with dynamic model_id
        addAnnotation(modelAnnotations.data); // Add fetched annotations to state

      } catch (error) {
        console.error("Error fetching annotations:", error);
      }
    };

    fetchAnnotations();

    socket.on("annotation_added", (newAnnotation) => {
      console.log("new annotation", newAnnotation);
      addAnnotation(newAnnotation);
    });

    // Clean up socket on unmount
    return () => socket.off("annotation_added");
  }, []);

  useEffect(() => {
    setEditorVisible(false);
    setAnnotationMode(false);
    setActiveModel(null);

  }, [activeScene]);


  const handleModelClick = async (point, normal, id) => {
    if (commentMode || textMode || mentionMode || dimensionMode || colorPickerMode || moveMode) {
      // Set the clicked point and show the AnnotationEditor
      setClickedPoint(point);
      setClickedNormal(normal);
      setEditorVisible(true);
      setActiveModel(id);
    }
  };

  const handleSaveAnnotation = async ({annotation_text, annotation_type}) => {

      try {
        // Send the annotation data to the backend
        const response = await axios.post(
          `${ANNOTATION_BASE_URL}`,
          {
            position: clickedPoint, // Use the clicked position
            normal: clickedNormal,
            annotation_text: annotation_text, // The annotation text
            user_id: 1, // Replace with actual user ID
            model_id: activeModel, // Replace with actual model ID
            scene_id: activeScene, // Replace with actual scene ID
            annotation_type: annotation_type, // Replace with actual annotation type
            user_role: "creator", // Replace with actual user role
            username: "Vishwanthie", // Replace with actual username
          }
        );

        console.log("Annotation Response from API Gateway:", response);

        const newAnnotation = response.data;

        // Emit the new annotation to other connected users via Socket.IO
        socket.emit("annotation_added", newAnnotation);

        // Directly append the new annotation to the state
        addAnnotation(newAnnotation);

        setEditorVisible(false);
        // setAnnotationMode(false);

      } catch (error) {
        console.error("Error saving annotation:", error);
      }
  };


  return (
    <div className="bg-zinc-800 flex justify-center items-center min-h-screen">
      <div className="flex justify-center items-center min-h-screen h-screen w-[100%] z-10">
        <Canvas>
          <Suspense fallback={null}>
            {models.map((model, index) => {
              // Check if the activeScene matches the model's scene_id
              if (activeScene === model.scene_id) {
                // Try to retrieve the model data for the activeScene from localStorage
                const storedModels =
                  JSON.parse(localStorage.getItem("models")) || [];
                const storedModel = storedModels.find(
                  (stored) => stored.sceneId === activeScene
                );

                // Determine the file path: prioritize localStorage, fallback to the model data
                const filePath = storedModel?.fileUrl || model.file_path;

                // Store the model data in localStorage only when it's rendered and not already stored
                if (!storedModel) {
                  const newStoredModel = {
                    fileUrl: model.file_path,
                    sceneId: model.scene_id,
                  };
                  localStorage.setItem(
                    "models",
                    JSON.stringify([...storedModels, newStoredModel])
                  );
                }

                // Render the Model component
                return (
                  <Model
                    key={index}
                    fileUrl={filePath}
                    handleClick={handleModelClick}
                    model_id={model.id}
                  />
                );
              }
              return null; // Return null for non-matching models
            })}
            {editorVisible && (
              <AnnotationEditor
                point={clickedPoint}
                onSave={handleSaveAnnotation} // Pass the function to save the annotation
                onCancel={() => setEditorVisible(false)} // Allow cancellation of annotation editor
              />
            )}
            <Annotations
              annotations={annotations}
              onSelectAnnotation={(annotation) =>
                setActiveAnnotation(annotation)
              }
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default CanvasArea;
