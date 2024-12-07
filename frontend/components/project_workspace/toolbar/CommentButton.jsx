import Image from "next/image";
import comment from "@public/assets/icons/comment.svg";

import { useContext, useState } from "react";
import { AnnotationContext } from "@contexts/AnnotationContext";

const CommentButton = () => {
  const {
    setClickedPoint,
    commentMode,
    setCommentMode,
    setTextMode,
    setMentionMode,
    setDimensionMode,
    setColorPickerMode,
    setMoveMode,
  } = useContext(AnnotationContext);

  const toggleCommentMode = () => {
    const newCommentMode = !commentMode;

    // Set commentMode to the toggled value
    setCommentMode(newCommentMode);

    // Reset all other modes to false
    if (newCommentMode) {
      setTextMode(false);
      setMentionMode(false);
      setDimensionMode(false);
      setColorPickerMode(false);
      setMoveMode(false);
    }

    // Reset clickedPoint when toggling
    setClickedPoint(null);
  };

  return (
    <button
      onClick={toggleCommentMode}
      className={`flex relative group justify-center items-center mx-2 p-1 cursor-pointer 
              ${
                commentMode ? "bg-zinc-800" : "hover:bg-zinc-800"
              } rounded-lg h-[32px] w-[32px]`}
    >
      <i className="bi bi-chat-fill text-[18px] text-zinc-500"></i>
      <span className="absolute top-[36px] mb-2 px-2 py-[2px] text-[10px] text-zinc-400 bg-zinc-700 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Comment
      </span>
    </button>
  );
};

export default CommentButton;
