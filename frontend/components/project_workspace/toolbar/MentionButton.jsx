import Image from "next/image";

import { useState } from "react";
import { useContext } from "react";
import { AnnotationContext } from "@contexts/AnnotationContext";

const MentionButton = () => {
  const { setClickedPoint } = useContext(AnnotationContext);

  const { mentionMode, setMentionMode } = useContext(AnnotationContext);
  const {
    setCommentMode,
    setTextMode,
    setDimensionMode,
    setColorPickerMode,
    setMoveMode,
  } = useContext(AnnotationContext);

  const toggleMentionMode = () => {
    const newMentionMode = !mentionMode;

    setMentionMode(newMentionMode);
    

    if (newMentionMode) {
      setCommentMode(false);
      setTextMode(false);
      setDimensionMode(false);
      setColorPickerMode(false);
      setMoveMode(false);

      // setClickedPoint(null);
    }

    setClickedPoint(null);
  };

  return (
    <button
      onClick={toggleMentionMode}
      className={`flex relative group justify-center items-center mx-2 p-1 cursor-pointer 
              ${
                mentionMode ? "bg-zinc-800" : "hover:bg-zinc-800"
              } rounded-lg h-[32px] w-[32px]`}
    >
      <i className="bi bi-at text-[22px] text-zinc-500"></i>
      <span className="absolute top-[36px] mb-2 px-2 py-[2px] text-[10px] text-zinc-400 bg-zinc-700 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Mention
      </span>
    </button>
  );
};

export default MentionButton;
