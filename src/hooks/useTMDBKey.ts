import { useCallback, useEffect, useState } from "react";
import { getStoredTMDBKey, setStoredTMDBKey } from "@/components/movies/TMDBKeyModal";

export function useTMDBKey() {
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    setKey(getStoredTMDBKey());
  }, []);

  const save = useCallback((k: string) => {
    setStoredTMDBKey(k);
    setKey(k);
  }, []);

  return { key, save, hasKey: !!key };
}