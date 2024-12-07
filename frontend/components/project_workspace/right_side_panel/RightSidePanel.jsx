import Image from "next/image";
import add from "@public/assets/icons/add.svg";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SceneContext } from "@contexts/SceneContext";
import AnnotationDetails from "../right_side_panel/AnnotationDetails";
import { SCENE_BASE_URL } from "@config/config";

const RightSidePanel = () => {
  const { scenes, addScene } = useContext(SceneContext);
  const { models } = useContext(SceneContext);
  const { activeAnnotation } = useContext(SceneContext);

  const [rightPane, setRightPane] = useState("properties");

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
    <div className="flex fixed top-[60px] right-[10px] bottom-[10px] text-xs text-slate-400 flex-col justify-between items-center w-[200px] bg-black rounded-2xl px-2 py-3 min-h-52 z-50">
      <div className="flex justify-between items-center w-full py-2 mb-2">
        <div
          className={`w-1/2 h-8 cursor-pointer ${
            rightPane === "properties" ? "bg-gray-700" : "hover:border-2"
          } flex border-gray-700 justify-center items-center rounded-lg mx-1`}
          onClick={() => setRightPane("properties")}
        >
          <h6 className="w-full flex justify-center">Properties</h6>
        </div>
        <div
          className={`w-1/2 h-8 cursor-pointer ${
            rightPane === "layers" ? "bg-gray-700" : "hover:border-2"
          } border-gray-700 flex justify-center items-center rounded-lg mx-1`}
          onClick={() => setRightPane("layers")}
        >
          <h6 className="w-full flex justify-center">Layers</h6>
        </div>
      </div>

      <div className="bg-gray-800 h-[1px] w-full mb-3"></div>

      {/* Objects */}
      {rightPane === "properties" && (
        <div
          className="w-full h-[100%] overflow-y-auto 
        scrollbar-none 
        scroll-smooth
        scrollbar-track-transparent 
        scrollbar-thumb-indigo-900
        scrollbar-corner-transparent"
        >
          {activeAnnotation && <AnnotationDetails />}
        </div>
      )}

      {/* Assets */}
      {rightPane === "layers" && (
        <div
          className="w-full h-[100%] overflow-y-auto 
        scrollbar-thin 
        scroll-smooth
        scrollbar-track-transparent 
        scrollbar-thumb-indigo-900
        scrollbar-corner-transparent"
        ></div>
      )}

      <div className="bg-gray-800 h-[1px] w-full mb-3"></div>

      <div className="w-full mb-2 px-2">
        <button className="bg-gray-700 w-full px-4 py-2 text-xs text-slate-300 rounded-lg cursor-pointer">
          Share
        </button>
      </div>

      <div className="flex flex-col justify-center items-start w-5/6">
        <div className="p-2">
          <h3>Export</h3>
        </div>
        <div className="p-2">
          <h3>Print</h3>
        </div>
      </div>
    </div>
  );
};

export default RightSidePanel;
