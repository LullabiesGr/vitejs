import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);

  const API_URL = "http://172.31.128.117:8000"; // Your backend

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setResultImage(null);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const sendToAPI = async (endpoint) => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.image_base64) {
        setResultImage(`data:image/jpeg;base64,${data.image_base64}`);
      } else {
        alert(JSON.stringify(data));
      }
    } catch (error) {
      alert("API Error: " + error.message);
    }
  };

  return (
    <div className="App" style={{ textAlign: "center", padding: 30 }}>
      <h2>🧠 AI Photo Enhancer</h2>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ marginTop: 20, maxWidth: "300px", borderRadius: 8 }}
        />
      )}
      <div style={{ marginTop: 20 }}>
        <button onClick={() => sendToAPI("sharpen_image")}>Sharpen</button>
        <button onClick={() => sendToAPI("denoise_image")}>Denoise</button>
        <button onClick={() => sendToAPI("cartoonify_image")}>Cartoonify</button>
        <button onClick={() => sendToAPI("white_balance_fix")}>White Balance</button>
      </div>
      {resultImage && (
        <div style={{ marginTop: 30 }}>
          <h4>✅ Enhanced Image:</h4>
          <img
            src={resultImage}
            alt="Result"
            style={{ maxWidth: "300px", border: "2px solid #ccc", borderRadius: 8 }}
          />
        </div>
      )}
    </div>
  );
}
