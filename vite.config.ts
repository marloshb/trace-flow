import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Base path for GitHub Pages deploy (repo: trace-flow).
// In dev, keep "/" so localhost keeps working.
const BASE = process.env.GITHUB_PAGES === "true" ? "/trace-flow/" : "/";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: BASE,
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
