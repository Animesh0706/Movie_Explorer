"use client"

import dynamic from "next/dynamic"

// Dynamically import the React Router app to avoid SSR issues
const ReactApp = dynamic(() => import("../src/App"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-screen">Loading...</div>,
})

export default function HomePage() {
  return <ReactApp />
}
