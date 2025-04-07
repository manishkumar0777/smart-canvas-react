import { useRef, useState } from "react";
import React from 'react';
import DrawingCanvas from "./DrawingCanvas.jsx";
import Tools from "../Tools.jsx";
import { analyzeMathImage } from "../../services/geminiVision.js";


function CanvasControls({ canvasRef, setResponse, setIsLoading }) {

  //states for the tools and drawing
  const [penColor, setPenColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [selectedTool, setSelectedTool] = useState('pen');

  //handling calculation
  const handleCalculate = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      setIsLoading(true);

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext("2d");

      tempCtx.fillStyle = "#ffffff";
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempCtx.drawImage(canvas, 0, 0);

      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const isBlank = !imageData.data.some(channel => channel !== 255);

      if (isBlank) {
        setResponse("Canvas is blank. Please draw something.");
        return;
      }

      const imageDataURL = tempCanvas.toDataURL("image/jpeg");
      const geminiResponse = await analyzeMathImage(imageDataURL);
      setResponse(geminiResponse);

    } catch (error) {
      console.error("CanvasControl :: handleCalculate :: Error:", error);
      setResponse("Error processing calculation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  //handling clear
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setResponse('');
  };


  return (
    <div className="flex flex-col items-center gap-6 my-2">
      {/* Tool controls */}
      <Tools 
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
        setPenColor={setPenColor}
        penColor={penColor}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        handleCalculate={handleCalculate}
        handleClear={handleClear}
      />

      {/* Canvas & Buttons */}
      <div className="flex items-start gap-6 w-full justify-center">
        <DrawingCanvas
          ref={canvasRef}
          penColor={penColor}
          strokeWidth={strokeWidth}
          tool={selectedTool}
        />

      </div>
    </div>
  );
}

export default CanvasControls;
