import { Environment, useGLTF } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Model({ fileUrl, handleClick, model_id }) {

  const [model, setModel] = useState(null);
  const [meshes, setMeshes] = useState([]);

  useEffect(() => {

    const loader = new GLTFLoader();

    loader.load(
      fileUrl,
      (glb) => {
        const scene = glb.scene;
        setModel(scene);

        const meshArray = [];
        scene.traverse((object) => {
          if (object.isMesh) {
            meshArray.push(object); // Collect meshes into an array
          }
        });
        setMeshes(meshArray);
      },

      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

  }, []);

  // console.log(nodes);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    const point = e.point; // The world-space 3D coordinates
    handleClick(point, e.face.normal, model_id); // Pass the normal vector for visibility checks
  };

  // const changeColor = (mesh, color) => {
  //   if (mesh.material) {
  //     mesh.material.color.set(color); // Change the color of the mesh
  //   }
  // };

  // const handleMeshClick = (mesh) => {
  //   // Example: Change color of the clicked mesh to red
  //   changeColor(mesh, 0xff0000);
  // };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={1} />
      <OrbitControls />
      <Environment preset="sunset" />

      <group dispose={null}>
        {model && (
          <primitive
            object={model}
            onPointerDown={handlePointerDown} // Add interaction to the model
          />
        )}

        {/* {meshes.map((mesh, index) => (
          <primitive
            key={index}
            object={mesh}
            onPointerDown={() => handleMeshClick(mesh)} // Handle mesh click for color change
          />
        ))} */}
      </group>
    </>
  );
}

export default Model;
