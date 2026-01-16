import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const indexPath = join(distDir, "index.html");

if (!existsSync(indexPath)) {
  console.error("Missing dist/index.html; run the build first.");
  process.exit(1);
}

const indexHtml = readFileSync(indexPath, "utf8");
if (indexHtml.includes("/tenney-web/")) {
  console.error("dist/index.html still references /tenney-web/.");
  process.exit(1);
}

const docsDir = join(distDir, "docs");
if (existsSync(docsDir)) {
  const htmlFiles = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const entryPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(entryPath);
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        htmlFiles.push(entryPath);
      }
    }
  };
  walk(docsDir);

  const offending = htmlFiles.filter((file) =>
    readFileSync(file, "utf8").includes("/tenney-web/docs/"),
  );
  if (offending.length > 0) {
    console.error("Docs HTML still references /tenney-web/docs/.", offending);
    process.exit(1);
  }
}
