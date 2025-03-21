import React, { useEffect } from 'react';
import * as deepar from 'deepar';
import "./App.css";

const App = () => {
  useEffect(() => {
    const initDeepAR = async () => {
      deepARRef.current = await deepar.initialize({
        licenseKey: process.env.REACT_APP_DEEPAR_LICENSE_KEY,
        canvas: document.getElementById("deepar-canvas"),
        effect: "/assets/effects/viking_helmet/viking_helmet.deepar",
        onInitialize: () => {
          console.log("DeepAR Initialized");
          deepARRef.current.start(); // Correct method to start DeepAR
        },
      });
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
