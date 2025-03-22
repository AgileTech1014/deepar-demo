// scripts/postbuild.js
const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");

const src = path.resolve(__dirname, "../node_modules/deepar");
const dest = path.resolve(__dirname, "../build/deepar-resources");

fse.copy(src, dest)
  .then(() => console.log("✅ DeepAR SDK copied to build/deepar-resources"))
  .catch(err => {
    console.error("❌ Failed to copy DeepAR SDK", err);
    process.exit(1);
  });
