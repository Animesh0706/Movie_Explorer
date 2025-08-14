"use client"

import dynamic from "next/dynamic"

const ReactApp = dynamic(() => import("../src/App"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  ),
})

/**
 * Main Next.js page component that renders the React Router application
 * Uses dynamic import with SSR disabled to avoid hydration issues
 */
export default function HomePage() {
  return <ReactApp />
}
