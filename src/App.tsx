// Main application component that sets up all providers and routing
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/ui/theme-provider"
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Favorites from "./pages/Favorites"
import MovieDetail from "./pages/MovieDetail"
import ProtectedRoute from "./routes/ProtectedRoute"
import { AuthProvider } from "./contexts/AuthContext"

// Initialize React Query client for server state management
const queryClient = new QueryClient()

/**
 * Root App component that wraps the entire application with necessary providers
 *
 * Provider hierarchy (outer to inner):
 * 1. QueryClientProvider - Manages server state and caching
 * 2. ThemeProvider - Handles light/dark mode theming
 * 3. TooltipProvider - Enables tooltip functionality across the app
 * 4. AuthProvider - Manages user authentication state
 * 5. BrowserRouter - Handles client-side routing
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* Theme provider with system preference detection and smooth transitions */}
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        {/* Toast notifications for user feedback */}
        <Toaster />
        <Sonner />

        {/* Authentication context for user state management */}
        <AuthProvider>
          {/* Router with v7 future flags to prevent deprecation warnings */}
          <BrowserRouter
            future={{
              v7_relativeSplatPath: true,
              v7_startTransition: true,
            }}
          >
            <Routes>
              {/* Public routes - accessible without authentication */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes - require user authentication */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movie/:id"
                element={
                  <ProtectedRoute>
                    <MovieDetail />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all route for 404 pages - MUST be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

export default App
