import React, { useEffect } from "react";
import * as deepar from "deepar";
import "./App.css";

const App = () => {
  useEffect(() => {
    const initializeDeepAR = async () => {
      const previewElement = document.getElementById("ar-screen");
      const loadingProgressBar = document.getElementById("loading-progress-bar");
      const loadingScreen = document.getElementById("loading-screen");
      const permissionDeniedScreen = document.getElementById("permission-denied-screen");

      if (!previewElement || !loadingProgressBar) return;

      loadingProgressBar.style.width = "100%";

      try {
        const deepARInstance = await deepar.initialize({
          licenseKey: process.env.REACT_APP_DEEPAR_LICENSE_KEY,
          canvas: previewElement,
          effect: "/resources/effects/ray-ban-wayfarer.deepar",
          rootPath: "/resources",
          additionalOptions: {
            cameraConfig: {
              // facingMode: "environment"
            },
          },
          onInitialize: () => {
            deepARInstance.start();
          },
        });

        loadingScreen.classList.add("hidden");
        previewElement.classList.remove("hidden");
      } catch (error) {
        console.error("DeepAR initialization failed:", error);
        loadingScreen.classList.add("hidden");
        permissionDeniedScreen.classList.remove("hidden");
      }
    };

    initializeDeepAR();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900 text-white">
      {/* Loading Screen */}
      <div
        id="loading-screen"
        className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-gray-900"
      >
        <img
          src="/images/crystal.png"
          alt="Logo"
          className="w-32 animate-bounce mb-4"
        />
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            id="loading-progress-bar"
            className="h-full bg-blue-500 transition-all duration-[5000ms]"
          ></div>
        </div>
        <img
          src="/images/powered-by.svg"
          alt="Powered by"
          className="w-36 mt-6"
        />
      </div>

      {/* Permission Denied Fallback */}
      <div
        id="permission-denied-screen"
        className="hidden absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-50 bg-gray-900"
      >
        <p className="text-xl font-semibold text-red-500">
          Please reload and allow camera access to use this app.
        </p>
        <a
          href="https://www.deepar.ai/projects"
          target="_blank"
          rel="noreferrer"
          className="mt-4 px-6 py-2 bg-white text-black rounded hover:bg-gray-200"
        >
          Discover more
        </a>
      </div>

      {/* AR Canvas */}
      <canvas
        id="ar-screen"
        className="hidden w-full h-full object-cover"
      ></canvas>
    </div>
  );
};

export default App;
