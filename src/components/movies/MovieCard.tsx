"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { TMDB_CONFIG } from "@/config/tmdb"
import { Star } from "lucide-react"

// Movie data structure from TMDB API
export interface Movie {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  overview?: string
  release_date?: string
}

interface MovieCardProps {
  movie: Movie
  onClick?: () => void
  actions?: React.ReactNode // Flexible slot for favorite buttons, etc.
}

/**
 * Helper function to construct TMDB image URLs with different sizes
 * @param path - Image path from TMDB API
 * @param size - Image size (w342, w500, w780, etc.)
 * @returns Complete image URL
 */
const IMG = (path: string, size = "w342") => `${TMDB_CONFIG.IMAGE_BASE_URL.replace("w500", size)}${path}`

/**
 * MovieCard component displays movie information in a card format
 *
 * Features:
 * - Responsive aspect ratio poster display
 * - Hover effects with scale animation and gradient overlay
 * - Star rating display
 * - Flexible action slot for buttons
 * - Accessibility features (ARIA labels, semantic HTML)
 * - Fallback for missing poster images
 */
const MovieCard = ({ movie, onClick, actions }: MovieCardProps) => {
  const hasPoster = !!movie.poster_path

  return (
    <article
      className={cn(
        // Base styles with card appearance
        "group rounded-xl border border-border/50 bg-card/80 backdrop-blur p-3 shadow-sm",
        // Hover effects with smooth transitions
        "transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer hover:-translate-y-1 hover:border-primary/30",
      )}
      onClick={onClick}
      role="button"
      aria-label={`View details for ${movie.title}`}
    >
      {/* Movie poster container with 2:3 aspect ratio */}
      <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted/50 relative">
        {hasPoster ? (
          <>
            {/* Movie poster image with hover scale effect */}
            <img
              src={IMG(movie.poster_path!) || "/placeholder.svg"}
              alt={`${movie.title} poster`}
              loading="lazy" // Optimize loading performance
              className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-110"
            />
            {/* Gradient overlay that appears on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          // Fallback for movies without poster images
          <div className="h-full w-full grid place-items-center text-muted-foreground text-sm bg-gradient-to-br from-muted to-muted/50">
            No image
          </div>
        )}
      </div>

      {/* Movie information section */}
      <div className="p-2 space-y-2">
        {/* Movie title with line clamping for long titles */}
        <h3 className="line-clamp-2 font-semibold text-sm leading-tight" title={movie.title}>
          {movie.title}
        </h3>

        {/* Star rating display */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
        </div>

        {/* Flexible action slot (favorite buttons, etc.) */}
        {actions && <div className="mt-3">{actions}</div>}
      </div>
    </article>
  )
}

export default MovieCard
