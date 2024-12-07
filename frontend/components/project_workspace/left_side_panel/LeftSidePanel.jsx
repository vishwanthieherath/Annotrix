import Image from "next/image";
import add from "@public/assets/icons/add.svg";
import { SCENE_BASE_URL } from "@config/config";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SceneContext } from "@contexts/SceneContext";
import { AnnotationContext } from "@contexts/AnnotationContext";
import Objects from "./Objects";

const LeftSidePanel = () => {
  const { scenes, addScene } = useContext(SceneContext);
  const { models } = useContext(SceneContext);
  const { annotations } = useContext(AnnotationContext);

  const [leftPane, setLeftPane] = useState("objects");

  useEffect(() => {
    const fetchScenes = async () => {
      try {
        const response = await axios.get(`${SCENE_BASE_URL}`);

        // console.log("Scenes:", response.data);

        addScene(response.data);
      } catch (error) {
        console.error("Error fetching scenes:", error);
      }
    };

    fetchScenes();
  }, []);

  return (
    <div className="flex fixed top-[60px] left-[10px] bottom-[10px] text-xs text-slate-400 flex-col justify-between items-center w-[200px] bg-black rounded-2xl px-2 py-3 min-h-52 z-50">
      <div className="flex justify-between items-center w-full py-2 mb-2">
        <div
          className={`w-1/2 h-8 cursor-pointer ${
            leftPane === "objects" ? "bg-gray-700" : "hover:border-2"
          } flex border-gray-700 justify-center items-center rounded-lg mx-1`}
          onClick={() => setLeftPane("objects")}
        >
          <h6 className="w-full flex justify-center">Objects</h6>
        </div>
        <div
          className={`w-1/2 h-8 cursor-pointer ${
            leftPane === "assets" ? "bg-gray-700" : "hover:border-2"
          } border-gray-700 flex justify-center items-center rounded-lg mx-1`}
          onClick={() => setLeftPane("assets")}
        >
          <h6 className="w-full flex justify-center">Assets</h6>
        </div>
      </div>

      <div className="bg-gray-800 h-[1px] w-full mb-3"></div>

      {/* Objects */}
      {leftPane === "objects" && (
        <div
          className="w-full h-[100%] overflow-y-auto
        scrollbar-thin 
        scroll-smooth
        scrollbar-track-transparent 
        scrollbar-thumb-indigo-900
        scrollbar-corner-transparent"
        >
          {/* Scenes */}
          <Objects objects={scenes} objectsName={"Scenes"} />

          <div className="bg-gray-800 h-[1px] w-full mb-3"></div>

          {/* Models */}
          <Objects objects={models} objectsName={"Models"} />

          <div className="bg-gray-800 h-[1px] w-full mb-3"></div>

          {/* Annotations */}
          <Objects objects={annotations} objectsName={"Annotations"} />
        </div>
      )}

      {/* Assets */}
      {leftPane === "assets" && (
        <div
          className="w-full h-[100%] overflow-y-auto scrollbar-thin 
        scroll-smooth
        scrollbar-track-transparent 
        scrollbar-thumb-indigo-900
        scrollbar-corner-transparent"
        ></div>
      )}

      <div className="bg-gray-800 h-[1px] w-full mb-3"></div>

      <div className="w-full mb-2 px-2">
        <button className="bg-gray-700 w-full px-4 py-2 text-xs text-slate-300 rounded-lg cursor-pointer">
          Create New Project
        </button>
      </div>

      <div className="flex flex-col justify-center items-start w-5/6">
        <div className="p-2">
          <h3>Chat</h3>
        </div>
        <div className="p-2">
          <h3>Meet</h3>
        </div>
      </div>
    </div>
  );
};

export default LeftSidePanel;
