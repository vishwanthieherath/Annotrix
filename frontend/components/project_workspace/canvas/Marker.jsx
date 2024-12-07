import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Marker = ({ id, isSelected, onSelect, type }) => {
  const { scene } = useGLTF("/assets/annotation.glb");

  // Clone the scene to ensure each instance is unique
  const clonedScene = THREE.Object3D.prototype.clone.call(scene);

  let markerColor;

  // console.log(type);

  switch (type) {
    case "comment":
      markerColor = "blue";
      break;
    case "text":
      markerColor = "green";
      break;
    case "mention":
      markerColor = "yellow";
      break;
    case "dimension":
      markerColor = "purple";
      break;
  }

  // Set the color based on the `isSelected` prop
  const color = isSelected ? "red" : markerColor;

  // Traverse the cloned scene and apply the color to all meshes
  clonedScene.traverse((child) => {
    if (child.isMesh) {
      child.material = child.material.clone(); // Clone material for independent changes
      child.material.color.set(color); // Set color based on selection
    }
  });

  // Add click event to all meshes
  const handleMeshClick = (event) => {
    event.stopPropagation(); // Prevent event from propagating further
    onSelect(); // Trigger the parent component's select handler
  };

  clonedScene.traverse((child) => {
    if (child.isMesh) {
      child.onClick = handleMeshClick; // Add click event to each mesh
    }
  });

  return (
    <primitive
      object={clonedScene}
      scale={[0.1, 0.1, 0.1]} // Scale the object
      rotation={[Math.PI / 2, Math.PI / 45, 0]} // Rotate the object
      position={[0, 0.03, 0]} // Position the object in 3D space
      onClick={handleMeshClick} // Catch clicks at the top-level mesh
    />
  );
};

export default Marker;
