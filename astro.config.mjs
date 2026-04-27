// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

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

  integrations: [react()],

  env: {
    schema: {
      TURSO_DATABASE_URL: envField.string({
        context: "server",
        access: "secret",
      }),
      TURSO_AUTH_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
