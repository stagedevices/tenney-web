import type { TenneyScalesIndex } from "./types";
import { TENNEY_SCALES_INDEX_FALLBACK, TENNEY_SCALES_INDEX_PRIMARY } from "./urls";

export const TENNEY_SCALES_CACHE_KEY = "tenney-scales:index:v1";
export const TENNEY_SCALES_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

type TenneyScalesCacheEntry = {
  savedAt: number;
  data: TenneyScalesIndex;
};

const REQUEST_TIMEOUT_MS = 8000;

function isTenneyScalesIndex(value: unknown): value is TenneyScalesIndex {
  if (!value || typeof value !== "object") return false;
  const record = value as { schemaVersion?: unknown; packs?: unknown };
  return typeof record.schemaVersion === "number" && Array.isArray(record.packs);
}

export function readTenneyScalesCache(): TenneyScalesCacheEntry | null {
  if (typeof window === "undefined" || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(TENNEY_SCALES_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as TenneyScalesCacheEntry;
    if (!parsed || typeof parsed.savedAt !== "number" || !isTenneyScalesIndex(parsed.data)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeTenneyScalesCache(data: TenneyScalesIndex) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    const payload: TenneyScalesCacheEntry = { savedAt: Date.now(), data };
    window.localStorage.setItem(TENNEY_SCALES_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage errors
  }
}

export function isCacheFresh(entry: TenneyScalesCacheEntry) {
  return Date.now() - entry.savedAt < TENNEY_SCALES_CACHE_TTL_MS;
}

async function fetchIndexFromUrl(url: string): Promise<TenneyScalesIndex> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Failed to fetch Tenney scales index (${response.status})`);
    }
    const data = (await response.json()) as unknown;
    if (!isTenneyScalesIndex(data)) {
      throw new Error("Invalid Tenney scales index response");
    }
    return data;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchTenneyScalesIndex(): Promise<TenneyScalesIndex> {
  const cached = readTenneyScalesCache();
  try {
    const data = await fetchIndexFromUrl(TENNEY_SCALES_INDEX_PRIMARY);
    writeTenneyScalesCache(data);
    return data;
  } catch (primaryError) {
    try {
      const data = await fetchIndexFromUrl(TENNEY_SCALES_INDEX_FALLBACK);
      writeTenneyScalesCache(data);
      return data;
    } catch (fallbackError) {
      if (cached) {
        return cached.data;
      }
      const error = fallbackError instanceof Error ? fallbackError : primaryError;
      throw error instanceof Error ? error : new Error("Unable to load Tenney scales index");
    }
  }
}
