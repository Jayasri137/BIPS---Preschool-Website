import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  
  // 👇 Add this section
  server: {
    host: true,    // Listen on all network interfaces (needed for 'npm run dev')
    port: 5173     // You can specify your preferred port
  },
  preview: {
    host: true,    // Listen on all network interfaces (needed for 'npm run preview')
    port: 4173     // This is the default port for production preview
  }
  
});

