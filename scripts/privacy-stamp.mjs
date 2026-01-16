import { execSync } from "node:child_process";

const privacyFiles = [
  "src/pages/Privacy.tsx",
  "src/content/privacy.config.tsx",
];

const fallbackStamp = () => new Date().toISOString().slice(0, 10);

export const getPrivacyStamp = () => {
  try {
    const result = execSync(`git log -1 --format=%cs -- ${privacyFiles.join(" ")}`, {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    return result || fallbackStamp();
  } catch (error) {
    return fallbackStamp();
  }
};

if (process.argv[1] === new URL(import.meta.url).pathname) {
  process.stdout.write(getPrivacyStamp());
}
