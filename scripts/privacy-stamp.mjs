import { execSync } from "node:child_process";

const privacyFiles = [
  "src/pages/Privacy.tsx",
  "src/content/privacy.config.tsx",
];

const pressFiles = [
  "src/pages/Press.tsx",
  "src/content/press/press.manifest.ts",
  "src/components/press/PressRail.tsx",
];

const fallbackStamp = () => new Date().toISOString().slice(0, 10);

const getStampForFiles = (files) => {
  try {
    const result = execSync(`git log -1 --format=%cs -- ${files.join(" ")}`, {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    return result || fallbackStamp();
  } catch (error) {
    return fallbackStamp();
  }
};

export const getPrivacyStamp = () => getStampForFiles(privacyFiles);
export const getPressStamp = () => getStampForFiles(pressFiles);

if (process.argv[1] === new URL(import.meta.url).pathname) {
  process.stdout.write(getPrivacyStamp());
}
