// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Playfair Display",
      cssVariable: "--font-serif",
    },
    {
      provider: fontProviders.google(),
      name: "Outfit",
      cssVariable: "--font-sans",
    },
    {
      provider: fontProviders.google(),
      name: "Roboto Mono",
      cssVariable: "--font-mono",
    },
  ],
});
