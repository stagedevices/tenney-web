import type { TenneyScalePack } from "./types";

const BASE = "https://cdn.jsdelivr.net/gh/stagedevices/tenney-scales@main/";

export const TENNEY_SCALES_BASE = BASE;

export const TENNEY_SCALES_INDEX_PRIMARY = `${BASE}INDEX.json`;
export const TENNEY_SCALES_INDEX_FALLBACK =
  "https://raw.githubusercontent.com/stagedevices/tenney-scales/main/INDEX.json";

export function toAbsolute(path: string) {
  const trimmed = path.replace(/^\/+/, "");
  return `${BASE}${trimmed}`;
}

export function packTenneyUrl(pack: TenneyScalePack) {
  return toAbsolute(pack.files.tenney);
}

export function packSclUrl(pack: TenneyScalePack) {
  return pack.files.scl ? toAbsolute(pack.files.scl) : null;
}

export function packAsclUrl(pack: TenneyScalePack) {
  return pack.files.ascl ? toAbsolute(pack.files.ascl) : null;
}

export function packKbmUrl(pack: TenneyScalePack) {
  return pack.files.kbm ? toAbsolute(pack.files.kbm) : null;
}
