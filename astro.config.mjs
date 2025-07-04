import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://hayaden.github.io/optc-ships',
  base: '/optc-ships/',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  redirects: {
    "/view": "/",
  },
});
