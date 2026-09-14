import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { serwist } from "@serwist/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
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
