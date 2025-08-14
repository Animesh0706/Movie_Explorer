const getAPIKey = (): string => {
  // Check localStorage first (user-provided key)
  if (typeof window !== "undefined") {
    const storedKey = localStorage.getItem("tmdb_api_key")
    if (storedKey && storedKey.trim()) {
      return storedKey.trim()
    }
  }

  // Check environment variables
  const viteKey = import.meta.env.VITE_TMDB_API_KEY
  const nextKey = import.meta.env.NEXT_PUBLIC_TMDB_API_KEY
  const fallbackKey = "b260ba0992bc7dc0ace2e38b75fee53a"

  if (viteKey) {
    return viteKey
  } else if (nextKey) {
    return nextKey
  } else {
    return fallbackKey
  }
}

export const TMDB_CONFIG = {
  get API_KEY() {
    return getAPIKey()
  },
  BASE_URL: "https://api.themoviedb.org/3",
  IMAGE_BASE_URL: "https://image.tmdb.org/t/p/w500",
  FALLBACK_IMAGE: "/placeholder.svg?height=750&width=500&text=No+Image",
}

export const getImageUrl = (path: string | null, size = "w500"): string => {
  if (!path) return TMDB_CONFIG.FALLBACK_IMAGE
  return `https://image.tmdb.org/t/p/${size}${path}`
}
