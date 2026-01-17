import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchTenneyScalesIndex,
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
  const pollIntervalRef = useRef<number | null>(null);

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
      setIsLoading(false);
    }

    if (cached) {
      void load(true);
    } else {
      void load(false);
    }
  }, [load]);

  useEffect(() => {
    const handleFocus = () => {
      void load(true);
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void load(true);
      }
    };
    const handleOnline = () => {
      void load(true);
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("online", handleOnline);
    };
  }, [load]);

  useEffect(() => {
    if (!data) {
      if (pollIntervalRef.current) {
        window.clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      return;
    }

    pollIntervalRef.current = window.setInterval(() => {
      void load(true);
    }, 10 * 60 * 1000);

    return () => {
      if (pollIntervalRef.current) {
        window.clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [data, load]);

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
