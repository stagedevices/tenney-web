import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchTenneyScalesIndex,
  isCacheFresh,
  readTenneyScalesCache,
  TENNEY_SCALES_CACHE_KEY,
} from "./fetchIndex";
import type { TenneyScalesIndex } from "./types";

type TenneyScalesState = {
  data: TenneyScalesIndex | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

export function useTenneyScalesIndex(): TenneyScalesState {
  const [data, setData] = useState<TenneyScalesIndex | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const hasFetchedRef = useRef(false);

  const load = useCallback(async (silent = false) => {
    if (!silent) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const latest = await fetchTenneyScalesIndex();
      setData(latest);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to load scale packs"));
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const cached = readTenneyScalesCache();
    if (cached?.data) {
      setData(cached.data);
    }

    if (cached && isCacheFresh(cached)) {
      setIsLoading(false);
      void load(true);
    } else {
      void load(false);
    }
  }, [load]);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        window.localStorage.removeItem(TENNEY_SCALES_CACHE_KEY);
      } catch {
        // Ignore storage errors
      }
    }
    try {
      const latest = await fetchTenneyScalesIndex({ forceFresh: true });
      setData(latest);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to load scale packs"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, refetch };
}
