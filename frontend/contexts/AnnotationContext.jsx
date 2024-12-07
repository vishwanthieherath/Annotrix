import React, { createContext, useState } from "react";

const AnnotationContext = createContext();

const AnnotationProvider = ({ children }) => {
  const [annotationMode, setAnnotationMode] = useState("");
  const [annotations, setAnnotations] = useState([]);

  const [clickedPoint, setClickedPoint] = useState(null);

  const [commentMode, setCommentMode] = useState(false);
  const [textMode, setTextMode] = useState(false);
  const [mentionMode, setMentionMode] = useState(false);
  const [dimensionMode, setDimensionMode] = useState(false);
  const [colorPickerMode, setColorPickerMode] = useState(false);
  const [moveMode, setMoveMode] = useState(false);

  const addAnnotation = (newAnnotation) => {
    if (Array.isArray(newAnnotation)) {
      // Replace all annotations if the input is an array
      setAnnotations(newAnnotation);
    } else {
      // Add a single annotation
      setAnnotations((prevAnnotations) => [...prevAnnotations, newAnnotation]);
    }
  };

  return (
    <AnnotationContext.Provider
      value={{ 
        annotationMode, 
        setAnnotationMode, 
        annotations, 
        addAnnotation, 
        clickedPoint, 
        setClickedPoint,
        commentMode,
        setCommentMode,
        textMode,
        setTextMode,
        mentionMode,
        setMentionMode,
        dimensionMode,
        setDimensionMode,
        colorPickerMode,
        setColorPickerMode,
        moveMode,
        setMoveMode
       }}
    >
      {children}
    </AnnotationContext.Provider>
  );
};

export { AnnotationContext, AnnotationProvider };
