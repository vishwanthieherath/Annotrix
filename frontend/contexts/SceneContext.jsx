import React, { createContext, useState } from "react";

const SceneContext = createContext();

const SceneProvider = ({ children }) => {

    const [scenes, setScenes] = useState([]);
    const [models, setModels] = useState([]);
    const [active, setActive] = useState(null);
    const [showScenes, setShowScenes] = useState(false);

    const [activeScene, setActiveScene] = useState(null);
    const [activeModel, setActiveModel] = useState(null);
    const [activeAnnotation, setActiveAnnotation] = useState(null);

  const addScene = (newScene) => {
    if (Array.isArray(newScene)) {
      // Replace all comments if the input is an array
      setScenes(newScene);
    } else {
      // Add a single comment
      setScenes((prevScenes) => [...prevScenes, newScene]);
    }
  };


  const addModel = (newModel) => {
    if (Array.isArray(newModel)) {
      // Replace all comments if the input is an array
      setModels(newModel);
    } else {
      // Add a single comment
      setModels((prevModels) => [...prevModels, newModel]);
    }
  };


  return (
    <SceneContext.Provider
      value={{
        scenes, 
        addScene, 
        models, 
        addModel, 
        activeScene, 
        setActiveScene, 
        activeModel, 
        setActiveModel, 
        activeAnnotation, 
        setActiveAnnotation, 
        active, 
        setActive,
        showScenes,
        setShowScenes
      }}
    >
      {children}
    </SceneContext.Provider>
  );
};

export { SceneContext, SceneProvider };
