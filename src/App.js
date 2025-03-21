import React, { useEffect } from 'react';
import * as deepar from 'deepar';
import "./App.css";

const App = () => {
  useEffect(() => {
    console.log(process.env.REACT_APP_DEEPAR_LICENSE_KEY);

    const initDeepAR = async () => {
      const deepARInstance = await deepar.initialize({
        licenseKey: process.env.REACT_APP_DEEPAR_LICENSE_KEY, // Add to .env file
        previewElement: document.getElementById("deepar-canvas"),
        effect: "https://cdn.jsdelivr.net/npm/deepar/effects/aviators",
      });

      deepARInstance.startVideo(true);
    };

    initDeepAR();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">DeepAR Face Filter Demo</h1>
      <canvas id="deepar-canvas" className="border w-full max-w-md aspect-video"></canvas>
    </div>
  );
}

export default App;
