"use client";

import { useThree } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Text } from "@react-three/drei";

import Marker from "./Marker";
import { useContext } from "react";
import { useState } from "react";
import { SceneContext } from "@contexts/SceneContext";

const Annotations = ({ annotations, onSelectAnnotation }) => {
  const { activeScene } = useContext(SceneContext);

  const { camera } = useThree();

  const [selectedId, setSelectedId] = useState(null);

  // console.log("Annotations", annotations);

  return annotations.map((annotation, index) => {
    if (activeScene !== annotation.scene_id) return;

    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection); // Camera's view direction
    cameraDirection.normalize();

    const annotationDirection = annotation.normal
      ? new THREE.Vector3(
          annotation.normal.x,
          annotation.normal.y,
          annotation.normal.z
        )
      : new THREE.Vector3(0, 0, 1);

    const annotationPosition = annotation.position
      ? new THREE.Vector3(
          annotation.position.x,
          annotation.position.y,
          annotation.position.z
        )
      : new THREE.Vector3(0, 0, 1);

    const visibility = annotationDirection.dot(cameraDirection) < -0.1;

    const handleSelect = (id) => {
      const isSelected = selectedId === id;
      setSelectedId(isSelected ? null : id); // Toggle selection
      onSelectAnnotation(isSelected ? null : annotation); // Pass annotation details
    };

    // console.log("Annotation Text", annotation.annotation_text);
    // console.log("Camera direction:", cameraDirection);
    // console.log("Annotation direction:", annotationDirection);
    // console.log("Visibility:", visibility);

    return (
      <group key={index} position={annotationPosition} visible={visibility}>
        {/* Marker */}
        <Marker
          key={annotation.id}
          id={annotation.id}
          isSelected={selectedId === annotation.id}
          onSelect={() => handleSelect(annotation.id)}
          type={annotation.annotation_type}
        />

        {/* {console.log("Rendering annotation:", annotation)} */}

        {/* <Text
          scale={[0.05, 0.05, 0.05]} // Adjust scale
          position={[0, 0.085, 0.033]} // Relative to the parent group
          fontSize={0.5} // Test with a manageable size
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {annotation.annotation_text}
        </Text> */}
      </group>
    );
  });
};

export default Annotations;
