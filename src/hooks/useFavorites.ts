import { useEffect, useMemo, useState } from "react";
import type { Movie } from "@/components/movies/MovieCard";

const STORAGE_KEY = "favorite_movies";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const ids = useMemo(() => new Set(favorites.map((m) => m.id)), [favorites]);

  const add = (movie: Movie) => {
    setFavorites((prev) => (ids.has(movie.id) ? prev : [movie, ...prev]));
  };
  const remove = (id: number) => setFavorites((prev) => prev.filter((m) => m.id !== id));
  const toggle = (movie: Movie) => (ids.has(movie.id) ? remove(movie.id) : add(movie));
  const has = (id: number) => ids.has(id);

  return { favorites, add, remove, toggle, has };
}