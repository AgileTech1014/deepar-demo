import React, { useEffect } from "react";
import * as deepar from "deepar";
import "./App.css";

const App = () => {
  useEffect(() => {
    const initializeDeepAR = async () => {
      const canvasElement = document.getElementById("face-filter-canvas");
      const loadingOverlay = document.getElementById("app-loading-overlay");
      const cameraErrorMessage = document.getElementById("camera-access-error");

      if (!canvasElement) return;

      try {
        const deepARInstance = await deepar.initialize({
          licenseKey: process.env.REACT_APP_DEEPAR_LICENSE_KEY,
          canvas: canvasElement,
          effect: "/resources/effects/ray-ban-wayfarer.deepar",
          rootPath: "/resources",
          additionalOptions: {
            cameraConfig: {
              // facingMode: "environment"
              resolutionPreset: "hd"
            },
          },
          onInitialize: () => {
            deepARInstance.start();
          },
        });

        loadingOverlay.classList.add("hidden");
        canvasElement.classList.remove("hidden");
      } catch (error) {
        console.error("DeepAR initialization failed:", error);
        loadingOverlay.classList.add("hidden");
        cameraErrorMessage.classList.remove("hidden");
      }
    };

    initializeDeepAR();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900 text-white">
      <div
        id="app-loading-overlay"
        className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-gray-900"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-sm text-gray-300">Loading, please wait...</p>
        </div>
      </div>

      <div
        id="camera-access-error"
        className="hidden absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-50 bg-gray-900"
      >
        <p className="text-xl font-semibold text-red-500">
          Please reload and allow camera access to use this app.
        </p>
      </div>

      <canvas
        id="face-filter-canvas"
        className="hidden w-full h-full object-cover"
      ></canvas>
    </div>
  );
};

export default App;
