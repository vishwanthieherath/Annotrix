"use client";

import { AnnotationContext } from "@contexts/AnnotationContext";
import { useContext } from "react";

// Import your different editor components
import CommentEditor from "./CommentEditor";
import TextEditor from "./TextEditor";
import { Html } from "@react-three/drei";
// import MentionEditor from "./MentionEditor";
// import DimentionEditor from "./DimentionEditor";
// import ColorPickerEditor from "./ColorPickerEditor";

import Marker from "../canvas/Marker";
import { comment } from "postcss";

const AnnotationEditor = ({ point, onSave, onCancel }) => {
  const { commentMode, textMode, mentionMode, dimensionMode, colorPickerMode, moveMode } = useContext(AnnotationContext);

  // Determine which editor component to render based on annotationMode
  let EditorComponent;

  if (commentMode) {
    EditorComponent = CommentEditor;
  }

  if (textMode) {
    EditorComponent = TextEditor;
  }

  if (mentionMode) {
    EditorComponent = MentionEditor;
  }

  if (dimensionMode) {
    EditorComponent = DimensionEditor;
  }

  if (colorPickerMode) {
    EditorComponent = ColorPickerEditor;
  }

  if (moveMode) {
    EditorComponent = null;
  }

  return (
    <group position={[point.x, point.y, point.z]}>
        {EditorComponent && (
          <EditorComponent point={point} onSave={onSave} onCancel={onCancel} />
        )}
    </group>
  );
};

export default AnnotationEditor;
