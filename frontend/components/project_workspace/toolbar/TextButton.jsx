import Image from "next/image";
import text from "@public/assets/icons/text.svg";

import { useState } from "react";
import { useContext } from "react";
import { AnnotationContext } from "@contexts/AnnotationContext";

const TextButton = () => {
  
  const { setClickedPoint } = useContext(AnnotationContext);

   const { textMode, setTextMode } = useContext(AnnotationContext);
   const {
     setCommentMode,
     setMentionMode,
     setDimensionMode,
     setColorPickerMode,
     setMoveMode,
   } = useContext(AnnotationContext);

   const toggleTextMode = () => {
     const newTextMode = !textMode;

     // Set commentMode to the toggled value
     setTextMode(newTextMode);
     

     if (newTextMode) {
       setCommentMode(false);
       setMentionMode(false);
       setDimensionMode(false);
       setColorPickerMode(false);
       setMoveMode(false);

      //  setClickedPoint(null);
     }

     setClickedPoint(null);
   };

  return (
    <button
      onClick={toggleTextMode}
      className={`flex relative group justify-center items-center mx-2 p-1 cursor-pointer 
              ${
                textMode ? "bg-zinc-800" : "hover:bg-zinc-800"
              } rounded-lg h-[32px] w-[32px]`}
    >
      <i className="bi bi-type text-[22px] text-zinc-500"></i>
      <span className="absolute top-[36px] mb-2 px-2 py-[2px] text-[10px] text-zinc-400 bg-zinc-700 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Text
      </span>
    </button>
  );
};

export default TextButton;
