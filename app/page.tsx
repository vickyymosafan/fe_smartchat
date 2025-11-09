"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import ChatbotInterface from "@/components/chatbot-interface"
import PinAuth from "@/components/pin-auth"
import SplashScreen from "@/components/splash-screen"

export default function Home() {
  const { isAuthenticated, isLoading, error, verifyPin } = useAuth()
  const [showSplash, setShowSplash] = useState(true)
  const [splashComplete, setSplashComplete] = useState(false)

  // Check if splash has been shown in this session
  useEffect(() => {
    const splashShown = sessionStorage.getItem("splash_shown")
    if (splashShown) {
      setShowSplash(false)
      setSplashComplete(true)
    }
  }, [])

  const handleSplashComplete = () => {
    sessionStorage.setItem("splash_shown", "true")
    setSplashComplete(true)
  }

  // Show splash screen on first load
  if (showSplash && !splashComplete) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  // Show loading state while checking auth
  if (isLoading && !error) {
    return (
      <main className="h-screen w-full bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  // Show PIN input if not authenticated
  if (!isAuthenticated) {
    return (
      <main className="h-screen w-full bg-background">
        <PinAuth onVerify={verifyPin} isLoading={isLoading} error={error} />
      </main>
    )
  }

  // Show chat interface if authenticated
  return (
    <main className="h-screen w-full bg-background">
      <ChatbotInterface />
    </main>
  )
}
