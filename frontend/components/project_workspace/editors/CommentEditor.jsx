"use client";

import { Html } from "@react-three/drei";

import { useContext, useState } from "react";
import { CommentContext } from "@contexts/AnnotationContext";
import Marker from "../canvas/Marker";

const CommentEditor = ({ point, onSave, onCancel }) => {
  const [commentText, setCommentText] = useState("");

  const handleSave = () => {
    if (commentText.trim() === "") {
      alert("Please enter a comment!");
      return;
    }
    onSave({ annotation_text:commentText, annotation_type:"comment" }); // Save the comment and send it to the backend
  };

  return (
    <>
      <Marker />
      <Html>
        <div className="ml-2 flex w-fit justify-between items-center p-2 bg-zinc-900 rounded-lg z-60">
          <input
            type="text"
            className="h-fit w-fit text-sm mr-2 outline-none bg-zinc-800 px-2 py-1 text-zinc-600 rounded-md"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
          ></input>
          <div className="flex ">
            <button
              className="bg-zinc-800 w-[50px] text-[10px] mx-1 rounded-md text-zinc-600 px-2 py-1 hover:bg-zinc-700"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-zinc-800 w-[50px] text-[10px] mx-1 rounded-md text-zinc-600 px-2 py-1 hover:bg-zinc-700"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </Html>
    </>
  );
};

export default CommentEditor;
