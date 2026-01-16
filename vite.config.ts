import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { getPrivacyStamp } from "./scripts/privacy-stamp.mjs";

export default defineConfig({
  plugins: [react()],
  base: "/",
  define: {
    __PRIVACY_LAST_UPDATED__: JSON.stringify(getPrivacyStamp()),
  },
});
