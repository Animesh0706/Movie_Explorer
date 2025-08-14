"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { Film } from "lucide-react"

const Login = () => {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) navigate("/")
  }, [user, navigate])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (email === "demo@example.com" && password === "password") {
      // Simulate successful login with demo user
      const demoUser = {
        id: "demo-user",
        email: "demo@example.com",
        name: "Demo User",
      }

      // Store demo user in localStorage to maintain session
      localStorage.setItem("user", JSON.stringify(demoUser))

      // Navigate to home page
      navigate("/")
      setLoading(false)
      return
    }

    // Continue with normal authentication for other credentials
    const { error } = await signIn(email, password)
    if (error) setError(error.message)
    else navigate("/")
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-card border border-border rounded-2xl overflow-hidden shadow-elevated">
        <CardHeader className="text-center space-y-4 pt-8 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-elevated">
            <Film className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <p className="text-muted-foreground text-lg">Sign in to your MovieExplorer account</p>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-base bg-input border-border rounded-xl focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 text-base bg-input border-border rounded-xl focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {error && <p className="text-sm text-destructive font-medium">{error}</p>}
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="text-center pt-4">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary/80 font-semibold underline-offset-4 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
            <div className="mt-8 p-6 bg-muted/50 rounded-xl border border-border/50">
              <h3 className="text-center font-semibold text-foreground mb-2">Demo Account:</h3>
              <p className="text-center text-sm text-muted-foreground">
                <span className="block">Email: demo@example.com</span>
                <span className="block">Password: password</span>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

export default Login
