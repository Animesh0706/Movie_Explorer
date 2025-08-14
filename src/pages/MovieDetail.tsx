"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "@/components/layout/Header"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/hooks/useFavorites"
import type { Movie } from "@/components/movies/MovieCard"
import { TMDB_CONFIG, getImageUrl } from "@/config/tmdb"

const MovieDetail = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const { has, toggle } = useFavorites()

  useEffect(() => {
    const run = async () => {
      if (!TMDB_CONFIG.API_KEY || TMDB_CONFIG.API_KEY === "your_tmdb_api_key_here" || !id) {
        console.error("TMDB API key not configured")
        setLoading(false)
        return
      }
      setLoading(true)
      try {
        const url = `${TMDB_CONFIG.BASE_URL}/movie/${id}?api_key=${TMDB_CONFIG.API_KEY}&language=en-US`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
        setMovie(data)
      } catch (error) {
        console.error("Error fetching movie:", error)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [id])

  return (
    <main className="min-h-screen">
      <Header />
      <section className="container mx-auto py-6">
        {loading || !movie ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="aspect-[2/3] w-full" />
            <div className="md:col-span-2 space-y-3">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        ) : (
          <article className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="aspect-[2/3] w-full overflow-hidden rounded-md bg-muted">
              {movie.poster_path ? (
                <img
                  src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
                  alt={`${movie.title} poster`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="h-full w-full grid place-items-center text-muted-foreground">
                  <div className="text-center p-4">
                    <div className="text-4xl mb-2">🎬</div>
                    <div>No Image Available</div>
                  </div>
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <h1 className="text-3xl font-semibold mb-2">{movie.title}</h1>
              <p className="text-muted-foreground mb-4">
                ⭐ {movie.vote_average?.toFixed(1)} • {movie.release_date}
              </p>
              <p className="leading-relaxed mb-6">{movie.overview}</p>
              <Button onClick={() => toggle(movie)} variant={has(movie.id) ? "secondary" : "default"}>
                {has(movie.id) ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </div>
          </article>
        )}
      </section>
    </main>
  )
}

export default MovieDetail
