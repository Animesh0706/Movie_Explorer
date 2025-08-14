"use client"

import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Heart, Film } from "lucide-react"

/**
 * Header component that provides navigation and user actions
 *
 * Features:
 * - Sticky positioning with backdrop blur effect
 * - Brand logo with gradient text effect
 * - Theme toggle for light/dark mode
 * - Navigation to favorites page
 * - User authentication status and sign out functionality
 */
const Header = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  // Loading state for sign out button to prevent multiple clicks
  const [busy, setBusy] = useState(false)

  /**
   * Handles user sign out with loading state management
   * Redirects to login page after successful sign out
   */
  const handleSignOut = async () => {
    setBusy(true)
    await signOut()
    setBusy(false)
    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Brand logo with gradient text and film icon */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          <Film className="h-6 w-6 text-blue-600" />
          Movie Explorer
        </Link>

        {/* Right side navigation and user actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle for light/dark mode switching */}
          <ThemeToggle />

          {/* Favorites page navigation with heart icon */}
          <Button variant="ghost" asChild className="hover:bg-accent/50">
            <Link to="/favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              My Favorites
            </Link>
          </Button>

          {/* Conditional rendering based on authentication status */}
          {user ? (
            // Authenticated user - show sign out button
            <Button
              variant="outline"
              onClick={handleSignOut}
              disabled={busy}
              className="hover:bg-destructive hover:text-destructive-foreground transition-colors bg-transparent"
            >
              {busy ? "Signing out..." : "Sign out"}
            </Button>
          ) : (
            // Unauthenticated user - show login/register buttons
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
