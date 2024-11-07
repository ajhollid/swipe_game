import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // This ensures assets are loaded correctly when deployed
  build: {
    outDir: "dist",
    assetsDir: "assets",
    assetsInclude: [
      "**/*.png",
      "**/*.jpg",
      "**/*.jpeg",
      "**/*.gif",
      "**/*.svg",
    ],
  },
});
