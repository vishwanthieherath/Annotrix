import Image from "next/image";

import { useState } from "react";
import { useContext } from "react";
import { AnnotationContext } from "@contexts/AnnotationContext";

const MoveButton = () => {
  const { setClickedPoint } = useContext(AnnotationContext);

  const { moveMode, setMoveMode } = useContext(AnnotationContext);
  const {
    setCommentMode,
    setMentionMode,
    setDimensionMode,
    setColorPickerMode,
    setTextMode,
  } = useContext(AnnotationContext);

  const toggleMoveMode = () => {
    const newMoveMode = !moveMode;

    setMoveMode(newMoveMode);
    

    if (newMoveMode) {
      setCommentMode(false);
      setMentionMode(false);
      setDimensionMode(false);
      setColorPickerMode(false);
      setTextMode(false);

      // setClickedPoint(null);
    }

    setClickedPoint(null);
  };

  return (
    <button
      onClick={toggleMoveMode}
      className={`flex relative group justify-center items-center mx-2 p-1 cursor-pointer 
              ${
                moveMode ? "bg-zinc-800" : "hover:bg-zinc-800"
              } rounded-lg h-[32px] w-[32px]`}
    >
      <i className="bi bi-cursor-fill text-[22px] text-zinc-500"></i>
      <span className="absolute top-[36px] mb-2 px-2 py-[2px] text-[10px] text-zinc-400 bg-zinc-700 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Move
      </span>
    </button>
  );
};

export default MoveButton;
