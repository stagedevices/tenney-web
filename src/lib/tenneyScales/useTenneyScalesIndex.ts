import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchTenneyScalesIndex,
  isCacheFresh,
  readTenneyScalesCache,
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
    await load(false);
  }, [load]);

  return { data, isLoading, error, refetch };
}
