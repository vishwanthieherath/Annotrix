import Image from "next/image";
import dimension from "@public/assets/icons/dimension.svg";

import { use, useState } from "react";
import { useContext } from "react";
import { AnnotationContext } from "@contexts/AnnotationContext";

const DimensionButton = () => {
  const { setClickedPoint } = useContext(AnnotationContext);

  const { dimensionMode, setDimensionMode } = useContext(AnnotationContext);
  const {
    setCommentMode,
    setMentionMode,
    setTextMode,
    setColorPickerMode,
    setMoveMode,
  } = useContext(AnnotationContext);

  const toggleDimensionMode = () => {
    const newDimensionMode = !dimensionMode;

    setDimensionMode(newDimensionMode);
    

    if (newDimensionMode) {
      setCommentMode(false);
      setMentionMode(false);
      setTextMode(false);
      setColorPickerMode(false);
      setMoveMode(false);

    }

    setClickedPoint(null);
  };

  return (
    <button
      onClick={toggleDimensionMode}
      className={`flex relative group justify-center items-center mx-2 p-1 cursor-pointer 
              ${
                dimensionMode ? "bg-zinc-800" : "hover:bg-zinc-800"
              } rounded-lg h-[32px] w-[32px]`}
    >
      <i className="bi bi-rulers text-[18px] text-zinc-500"></i>
      <span className="absolute top-[36px] mb-2 px-2 py-[2px] text-[10px] text-zinc-400 bg-zinc-700 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Dimension
      </span>
    </button>
  );
};

export default DimensionButton;
