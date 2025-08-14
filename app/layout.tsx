import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Movie Explorer - Discover Your Next Favorite Film",
  description: "Explore movies, manage favorites, and discover new films with our comprehensive movie database.",
  generator: "v0.app",
  keywords: ["movies", "films", "cinema", "entertainment", "favorites"],
  authors: [{ name: "Movie Explorer Team" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
