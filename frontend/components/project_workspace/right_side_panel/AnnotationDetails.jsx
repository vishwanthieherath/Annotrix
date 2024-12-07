import React, { useContext, useEffect, useState } from "react";
import { SceneContext } from "@contexts/SceneContext";
import { ANNOTATION_BASE_URL } from "@config/config";
import axios from "axios";

const AnnotationDetails = () => {
  const { activeAnnotation, setActiveAnnotation } = useContext(SceneContext);

  const text = "Vishwanthie Herath";
 
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${ANNOTATION_BASE_URL}/${activeAnnotation.id}`
      );
      if (response.status === 200) {
        alert("Annotation deleted successfully");
        setActiveAnnotation(null); // Clear active annotation
        console.log("Deleted Annotation", response.data);
      } else {
        alert("Failed to delete annotation");
      }
    } catch (error) {
      console.error("Error deleting annotation:", error);
    }
  };

  const handleUpdate = async () => {
    const updatedText = prompt(
      "Edit annotation text:",
      activeAnnotation.annotation_text
    );
    if (!updatedText) return;

    try {
      const response = await axios.put(
        `${ANNOTATION_BASE_URL}/${activeAnnotation.id}`,
        { annotation_text: updatedText }, // Data to send in the request
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const updatedAnnotation = response.data;
        alert("Annotation updated successfully");
        console.log("Updated Annotation", updatedAnnotation);
        setActiveAnnotation(updatedAnnotation.id); // Update local state
      } else {
        alert("Failed to update annotation");
      }
    } catch (error) {
      console.error("Error updating annotation:", error);
    }
  };

  return (
    <div className="w-full flex-col p-2">
      <div className="mb-4 flex justify-around">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-700 text-white text-md font-semibold cursor-pointer">
          {text.charAt(0).toUpperCase()}
        </div>
        <div className="whitespace-nowrap flex justify-center items-center w-[120px] overflow-x-scroll scrollbar-none">
          {text}
        </div>
      </div>

      <div className="bg-gray-800 h-[1px] w-full mb-4"></div>

      <div className="mb-4 border-solid border-zinc-600 border-2 rounded-lg px-2 py-3 text-zinc-500 bg-zinc-800 min-h-[100px] break-words">
        {activeAnnotation && activeAnnotation.annotation_text}
      </div>

      <div className="w-full px-4 flex justify-between items-center mb-4">
        <button className="w-[60px] bg-zinc-800 h-[20px] rounded-md flex justify-center items-center hover:bg-zinc-700 "
          onClick={handleDelete}
        >
          Delete
        </button>
        <button className="w-[60px] bg-zinc-800 h-[20px] rounded-md flex justify-center items-center hover:bg-zinc-700 "
          onClick={handleUpdate}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default AnnotationDetails;
