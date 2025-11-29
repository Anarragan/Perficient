import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { componentTagger } from "lovable-tagger";

export default ({ mode }: { mode: string }) => ({
  server: {
    // Bind to IPv4 for broader compatibility on Windows
    host: "0.0.0.0",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean) as any,
  resolve: {
    alias: {
      "@": resolve(fileURLToPath(new URL("./src", import.meta.url))),
    },
  },
});
