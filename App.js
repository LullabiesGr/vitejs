import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blurScore, setBlurScore] = useState(null);

  const API_URL = "https://testpython-hjcy.onrender.com";  // ✅ Your deployed backend URL

const sendToAPI = async (endpoint) => {
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();

    if (data.image_base64) {
      setResultImage(`data:image/jpeg;base64,${data.image_base64}`);
    } else {
      alert("No image returned from API");
    }
  } catch (error) {
    console.error("API Error:", error);
    alert("Failed to reach the API: " + error.message);
  }
};


  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>🧠 AI Photo Enhancer</h2>
      <input type="file" onChange={handleFileChange} accept="image/*" />

      {preview && (
        <div>
          <img src={preview} alt="Preview" width={200} style={{ marginTop: 10 }} />
        </div>
      )}

      <div style={{ marginTop: 20, display: "flex", gap: "10px", flexWrap: "wrap" }}>
  <button onClick={() => sendToAPI("sharpen_image")}>Sharpen</button>
  <button onClick={() => sendToAPI("denoise_image")}>Denoise</button>
  <button onClick={() => sendToAPI("cartoonify_image")}>Cartoonify</button>
  <button onClick={() => sendToAPI("white_balance_fix")}>White Balance</button>
  <button onClick={() => sendToAPI("blur_score")}>Blur Score</button> {/* New */}
  <button onClick={() => sendToAPI("smart_rank_photos")}>Smart Rank</button> {/* New */}
  <button onClick={() => sendToAPI("auto_crop_face")}>Auto Crop Face</button> {/* New */}
  <button onClick={() => sendToAPI("detect_closed_eyes")}>Detect Closed Eyes</button> {/* New */}
  <button onClick={() => sendToAPI("detect_pose_smile")}>Detect Pose & Smile</button> {/* New */}
</div>


      {loading && <p>Loading...</p>}

      {resultImage && (
        <div style={{ marginTop: 20 }}>
          <h4>Enhanced Image:</h4>
          <img src={resultImage} alt="Result" width={200} />
        </div>
      )}

      {blurScore !== null && (
        <div style={{ marginTop: 20 }}>
          <h4>Blur Score: {blurScore.toFixed(2)}</h4>
        </div>
      )}
    </div>
  );
}

