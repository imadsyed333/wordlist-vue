import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { serwist } from "@serwist/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    serwist({
      swSrc: "src/sw.ts",
      swDest: "dist/sw.js",
      globDirectory: "dist",
      injectionPoint: "self.__SW_MANIFEST",
      rollupFormat: "iife",
    }),
  ],
});
