"use client";

import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { FileContext } from "@contexts/FileContext";
import { SceneContext } from "@contexts/SceneContext";
import upload from "@api/ModelUpload";
import axios from "axios";

import { SCENE_BASE_URL } from "@config/config";

const ImportButton = () => {

  const fileInputRef = useRef(null);
  const { setFile } = useContext(FileContext);
  const { addScene, setActiveScene, setShowScenes, setActive, addModel } = useContext(SceneContext);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".glb")) {
      alert("Please upload a valid .glb file.");
      return;
    }

    try {

      const scene = await axios.post(`${SCENE_BASE_URL}`, {
        scene_name: selectedFile.name.split(".")[0],
      });


      const model = await upload(selectedFile, scene.data.id);
      console.log("Response from API Gateway:", model);

      if(model) {
        addScene(scene.data);
        setShowScenes(true);
        setActiveScene(scene.data.id);
        setActive(scene.data.id);
        addModel(model.data);
      }

    } catch (error) {
      alert("Failed to upload the file. Please try again.");
      console.error("Error during file upload:", error);
    }
    
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <button
      onClick={handleButtonClick}
      className="flex relative group justify-center items-center mx-2 p-1 cursor-pointer 
              hover:bg-zinc-800 rounded-lg h-[32px] w-[32px]"
    >
      <i className="bi bi-cloud-arrow-up-fill text-[20px] text-zinc-500"></i>
      <span className="absolute top-[36px] mb-2 px-2 py-[2px] text-[10px] text-zinc-400 bg-zinc-700 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Import
      </span>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </button>
  );
}

export default ImportButton;
