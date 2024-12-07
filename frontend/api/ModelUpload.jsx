import axios from "axios";
import { MODEL_BASE_URL } from "@config/config";

export default async function upload(selectedFile, sceneId) {
  
  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append("scene_id", sceneId);

  try {
    const response = await axios.post(`${MODEL_BASE_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Upload successful:");
    
    return response;

  } catch (error) {
    console.error("Upload failed:", error);
  }

}
