"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Header from "@/components/layout/Header"
import MovieCard, { type Movie } from "@/components/movies/MovieCard"
import { TMDB_CONFIG } from "@/config/tmdb"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useFavorites } from "@/hooks/useFavorites"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"

// TMDB API response structure for movie lists
interface TMDBListResponse {
  page: number
  total_pages: number
  results: Movie[]
}

/**
 * Index page component - Main movie browsing interface
 *
 * Features:
 * - Search functionality with real-time API calls
 * - Infinite scroll pagination (Load More button)
 * - Popular movies display when no search query
 * - Favorite/unfavorite functionality
 * - Loading states with skeleton placeholders
 * - Responsive grid layout
 * - Error handling for API failures
 */
const Index = () => {
  const navigate = useNavigate()

  // Search and pagination state
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState<Movie[]>([])

  // Favorites functionality
  const { toggle, has } = useFavorites()

  // Ref to track component mount status
  const mounted = useRef(false)

  // Reset movies and page when search query changes
  useEffect(() => {
    setMovies([])
    setPage(1)
  }, [query])

  /**
   * Main effect for fetching movies from TMDB API
   * Handles both search and popular movies endpoints
   * Implements pagination by appending new results to existing ones
   */
  useEffect(() => {
    let cancel = false // Cleanup flag for cancelled requests

    const run = async () => {
      // Validate API key configuration
      if (!TMDB_CONFIG.API_KEY || TMDB_CONFIG.API_KEY === "your_tmdb_api_key_here") {
        console.error("TMDB API key not configured")
        return
      }

      setLoading(true)
      try {
        // Choose endpoint based on search query
        const endpoint = query ? "/search/movie" : "/movie/popular"
        const url = `${TMDB_CONFIG.BASE_URL}${endpoint}?api_key=${TMDB_CONFIG.API_KEY}&language=en-US&page=${page}&query=${encodeURIComponent(query)}`

        const res = await fetch(url)
        const data = (await res.json()) as TMDBListResponse

        // Check if request was cancelled during fetch
        if (cancel) return

        // Validate API response structure
        if (data.results && Array.isArray(data.results)) {
          setTotalPages(data.total_pages || 1)
          // For page 1, replace movies; for subsequent pages, append
          setMovies((prev) => (page === 1 ? data.results : [...prev, ...data.results]))
        } else {
          // Handle API errors (invalid key, rate limits, etc.)
          console.error("API Error:", data)
          if (page === 1) {
            setMovies([])
          }
        }
      } catch (error) {
        console.error("Fetch error:", error)
        // Clear movies only for first page errors
        if (page === 1) {
          setMovies([])
        }
      } finally {
        setLoading(false)
      }
    }

    run()

    // Cleanup function to cancel ongoing requests
    return () => {
      cancel = true
    }
  }, [page, query])

  // Track component mount status (currently unused but available for future features)
  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
  }, [])

  // Memoized check for load more button availability
  const canLoadMore = useMemo(() => page < totalPages, [page, totalPages])

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />

      <section className="container mx-auto py-8 px-4">
        {/* Screen reader accessible page title */}
        <h1 className="sr-only">Movie Explorer - Browse and Search Movies</h1>

        {/* Search input section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            {/* Search icon positioned absolutely inside input */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for movies, actors, directors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search movies"
              className="pl-10 h-12 text-base bg-card/50 backdrop-blur border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Movies grid with responsive columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              onClick={() => navigate(`/movie/${m.id}`)}
              actions={
                <Button
                  variant={has(m.id) ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    // Prevent card click when clicking favorite button
                    e.stopPropagation()
                    toggle(m)
                  }}
                  className={
                    has(m.id)
                      ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0"
                      : "hover:bg-accent/50"
                  }
                >
                  {has(m.id) ? "Remove Favorite" : "Add Favorite"}
                </Button>
              }
            />
          ))}

          {/* Loading skeleton placeholders */}
          {loading &&
            Array.from({ length: 12 }).map((_, i) => (
              <div key={`sk-${i}`} className="space-y-3">
                <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
        </div>

        {/* Load more button for pagination */}
        <div className="mt-12 flex justify-center">
          {canLoadMore && (
            <Button
              onClick={() => setPage((p) => p + 1)}
              disabled={loading}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8"
            >
              {loading ? "Loading..." : "Load More Movies"}
            </Button>
          )}
        </div>
      </section>
    </main>
  )
}

export default Index
