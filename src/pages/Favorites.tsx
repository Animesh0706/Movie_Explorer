import Header from "@/components/layout/Header";
import MovieCard from "@/components/movies/MovieCard";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { favorites, remove } = useFavorites();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen">
      <Header />
      <section className="container mx-auto py-6">
        <h1 className="text-2xl font-semibold mb-4">My Favorites</h1>
        {favorites.length === 0 ? (
          <p className="text-muted-foreground">No favorites yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {favorites.map((m) => (
              <MovieCard
                key={m.id}
                movie={m}
                onClick={() => navigate(`/movie/${m.id}`)}
                actions={
                  <Button variant="outline" onClick={(e) => { e.stopPropagation(); remove(m.id); }}>
                    Remove
                  </Button>
                }
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Favorites;