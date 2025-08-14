'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { Movie } from '@/types/movie';
import { tmdb } from '@/lib/tmdb';
import { FavoritesManager } from '@/lib/favorites';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
  isFavorite?: boolean;
  onFavoriteChange?: (movieId: number, isFavorite: boolean) => void;
}

export function MovieCard({ movie, isFavorite = false, onFavoriteChange }: MovieCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isFav, setIsFav] = useState(isFavorite);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newFavoriteStatus = FavoritesManager.toggleFavorite(movie);
    setIsFav(newFavoriteStatus);
    onFavoriteChange?.(movie.id, newFavoriteStatus);
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const formatReleaseYear = (date: string) => {
    return new Date(date).getFullYear().toString();
  };

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="group relative overflow-hidden rounded-lg bg-card shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer">
        {/* Movie Poster */}
        <div className="aspect-[2/3] w-full relative overflow-hidden">
          {!imageError ? (
            <>
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              <Image
                src={tmdb.getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                fill
                className={cn(
                  "object-cover transition-all duration-500 group-hover:scale-110",
                  isImageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <span className="text-muted-foreground text-sm">No Image</span>
            </div>
          )}

          {/* Overlay with favorite button */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleFavoriteClick}
              className={cn(
                "absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110",
                isFav 
                  ? "bg-red-500/90 text-white shadow-lg" 
                  : "bg-black/50 text-white hover:bg-black/70"
              )}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isFav && "fill-current"
                )}
              />
            </button>
          </div>

          {/* Rating Badge */}
          {movie.vote_average > 0 && (
            <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{formatRating(movie.vote_average)}</span>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{movie.release_date ? formatReleaseYear(movie.release_date) : 'TBA'}</span>
            {movie.vote_count > 0 && (
              <span>{movie.vote_count.toLocaleString()} votes</span>
            )}
          </div>

          {movie.overview && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {movie.overview}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}