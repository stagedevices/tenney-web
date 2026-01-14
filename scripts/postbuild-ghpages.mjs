import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve("dist");
const indexFile = resolve(distDir, "index.html");
const fallbackFile = resolve(distDir, "404.html");

if (existsSync(indexFile)) {
  copyFileSync(indexFile, fallbackFile);
  console.log("Created 404.html for GitHub Pages.");
} else {
  console.warn("index.html not found; skipping 404.html creation.");
}
