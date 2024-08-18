import React, { useState } from "react";
import axios from "axios";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Use useEffect to check if the API key is being loaded
  

 const handleGenerateImage = async () => {
  if (!prompt.trim()) {
    setError("Prompt cannot be empty.");
    return;
  }
  setLoading(true);
  setError("");
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    setImageUrl(response.data.data[0].url);
  } catch (err) {
    setError("Failed to generate image. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <h2>AI Image Generator</h2>
      <input
        type="text"
        placeholder="Enter a prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleGenerateImage} disabled={loading}>
        {loading ? "Generating..." : "Generate Image"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
};

export default ImageGenerator;
