"use client";

import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { Html } from "@react-three/drei";
import Marker from "../canvas/Marker";
import { stateToHTML } from "draft-js-export-html";

const TextEditor = ({ point, onSave, onCancel }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [urlValue, setUrlValue] = useState("");

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const addLink = () => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    if (!selection.isCollapsed() && urlValue.trim() !== "") {
      const contentStateWithLink = contentState.createEntity(
        "LINK",
        "MUTABLE",
        { url: urlValue }
      );
      const entityKey = contentStateWithLink.getLastCreatedEntityKey();
      const newContentState = Modifier.applyEntity(
        contentState,
        selection,
        entityKey
      );

      setEditorState(
        EditorState.push(editorState, newContentState, "apply-entity")
      );
    }
    setShowLinkInput(false);
    setUrlValue("");
  };

  const handleSave = () => {
    const content = editorState.getCurrentContent();
    const rawText = content.getPlainText().trim();

    if (rawText === "") {
      alert("Please enter text before saving!");
      return;
    }

    const html = stateToHTML(content);

    onSave({ annotation_text: html, annotation_type: "text" });
  };

  return (
    <>
      <Marker />
      <Html>
        <div className="bg-zinc-900 rounded-lg p-4 max-w-md w-full">
          {/* Toolbar */}
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => toggleInlineStyle("BOLD")}
              className="bg-zinc-800 px-2 py-1 rounded-md text-white text-sm hover:bg-zinc-700"
            >
              Bold
            </button>
            <button
              onClick={() => toggleInlineStyle("ITALIC")}
              className="bg-zinc-800 px-2 py-1 rounded-md text-white text-sm hover:bg-zinc-700"
            >
              Italic
            </button>
            <button
              onClick={() => setShowLinkInput(!showLinkInput)}
              className="bg-zinc-800 px-2 py-1 rounded-md text-white text-sm hover:bg-zinc-700"
            >
              Add Link
            </button>
            <label className="cursor-pointer bg-zinc-800 px-2 py-1 rounded-md text-white text-sm hover:bg-zinc-700">
              Attach File
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  alert(`Attached file: ${e.target.files[0]?.name}`)
                }
              />
            </label>
          </div>

          {/* Link Input */}
          {showLinkInput && (
            <div className="mb-2">
              <input
                type="text"
                placeholder="Enter link URL"
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                className="bg-zinc-800 px-2 py-1 rounded-md text-white text-sm w-full"
              />
              <button
                onClick={addLink}
                className="mt-1 bg-green-600 px-2 py-1 rounded-md text-white text-sm hover:bg-green-500"
              >
                Add Link
              </button>
            </div>
          )}

          {/* Editor */}
          <div className="border border-zinc-700 rounded-md p-2 bg-zinc-800">
            <Editor
              editorState={editorState}
              handleKeyCommand={handleKeyCommand}
              onChange={setEditorState}
              placeholder="Write something amazing..."
              className="text-white"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={handleSave}
              className="bg-green-600 px-4 py-1 rounded-md text-white text-sm hover:bg-green-500"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="bg-red-600 px-4 py-1 rounded-md text-white text-sm hover:bg-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </Html>
    </>
  );
};

export default TextEditor;
