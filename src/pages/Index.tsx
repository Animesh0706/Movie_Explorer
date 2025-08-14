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
import { Search, Wifi, WifiOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// TMDB API response structure for movie lists
interface TMDBListResponse {
  page: number
  total_pages: number
  results: Movie[]
}

const DEMO_MOVIES: Movie[] = [
  {
    id: 1,
    title: "War of the Worlds",
    poster_path: "/placeholder.svg?height=450&width=300&text=War+of+the+Worlds",
    vote_average: 4.2,
    overview: "Demo movie for offline viewing",
    release_date: "2024-01-01",
  },
  {
    id: 2,
    title: "Jurassic World Rebirth",
    poster_path: "/placeholder.svg?height=450&width=300&text=Jurassic+World",
    vote_average: 6.4,
    overview: "Demo movie for offline viewing",
    release_date: "2024-01-01",
  },
  {
    id: 3,
    title: "William Tell",
    poster_path: "/placeholder.svg?height=450&width=300&text=William+Tell",
    vote_average: 6.3,
    overview: "Demo movie for offline viewing",
    release_date: "2024-01-01",
  },
  {
    id: 4,
    title: "The Pickup",
    poster_path: "/placeholder.svg?height=450&width=300&text=The+Pickup",
    vote_average: 6.6,
    overview: "Demo movie for offline viewing",
    release_date: "2024-01-01",
  },
  {
    id: 5,
    title: "Legends of the Condor Heroes",
    poster_path: "/placeholder.svg?height=450&width=300&text=Legends+of+Condor",
    vote_average: 6.2,
    overview: "Demo movie for offline viewing",
    release_date: "2024-01-01",
  },
  {
    id: 6,
    title: "How to Train Your Dragon",
    poster_path: "/placeholder.svg?height=450&width=300&text=How+to+Train+Dragon",
    vote_average: 8.0,
    overview: "Demo movie for offline viewing",
    release_date: "2024-01-01",
  },
]

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
 * - Error handling for API failures and network issues
 * - Fallback demo content when API is unreachable
 */
const Index = () => {
  const navigate = useNavigate()

  // Search and pagination state
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState<Movie[]>([])

  const [networkError, setNetworkError] = useState(false)
  const [showingDemo, setShowingDemo] = useState(false)

  // Favorites functionality
  const { toggle, has } = useFavorites()

  // Ref to track component mount status
  const mounted = useRef(false)

  // Reset movies and page when search query changes
  useEffect(() => {
    setMovies([])
    setPage(1)
    setNetworkError(false)
    setShowingDemo(false)
  }, [query])

  /**
   * Main effect for fetching movies from TMDB API
   * Handles both search and popular movies endpoints
   * Implements pagination by appending new results to existing ones
   * Now includes network error detection and fallback content
   */
  useEffect(() => {
    let cancel = false // Cleanup flag for cancelled requests
    let url = "" // Declare the url variable here

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
        url = `${TMDB_CONFIG.BASE_URL}${endpoint}?api_key=${TMDB_CONFIG.API_KEY}&language=en-US&page=${page}&query=${encodeURIComponent(query)}`

        const res = await fetch(url)
        const data = (await res.json()) as TMDBListResponse

        console.log("API Response:", {
          url,
          status: res.status,
          ok: res.ok,
          dataKeys: Object.keys(data),
          resultsCount: data.results?.length || 0,
          firstMovie: data.results?.[0],
          totalPages: data.total_pages,
        })

        // Check if request was cancelled during fetch
        if (cancel) return

        setNetworkError(false)
        setShowingDemo(false)

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
        console.error("Fetch error details:", {
          error,
          message: error instanceof Error ? error.message : "Unknown error",
          url,
        })

        const isNetworkError =
          error instanceof Error &&
          (error.message.includes("Failed to fetch") ||
            error.message.includes("NetworkError") ||
            error.message.includes("ERR_CONNECTION_TIMED_OUT") ||
            error.name === "TypeError")

        if (isNetworkError && page === 1) {
          console.warn("Network error detected, showing demo content")
          setNetworkError(true)
          setShowingDemo(true)
          setMovies(DEMO_MOVIES)
          setTotalPages(1)
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
  const canLoadMore = useMemo(() => page < totalPages && !showingDemo, [page, totalPages, showingDemo])

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />

      <section className="container mx-auto py-8 px-4">
        {/* Screen reader accessible page title */}
        <h1 className="sr-only">Movie Explorer - Browse and Search Movies</h1>

        {networkError && (
          <Alert className="max-w-2xl mx-auto mb-6 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <WifiOff className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 dark:text-orange-200">
              <strong>Network Issue Detected:</strong> Unable to connect to movie database. Showing demo content below.
              This may be due to firewall restrictions or network connectivity issues.
            </AlertDescription>
          </Alert>
        )}

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
              disabled={showingDemo}
            />
          </div>
          {showingDemo && (
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Search is disabled in demo mode due to network connectivity issues
            </p>
          )}
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

        {!loading && movies.length === 0 && !networkError && (
          <div className="text-center py-12">
            <Wifi className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No movies found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or check your network connection.</p>
          </div>
        )}

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
