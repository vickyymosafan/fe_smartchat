"use client"

import { useAuth } from "@/hooks/useAuth"
import { useSplashScreen } from "@/hooks/useSplashScreen"
import ChatbotInterface from "@/components/chatbot-interface"
import PinAuth from "@/components/pin-auth"
import SplashScreen from "@/components/splash-screen"

export default function Home() {
  const { isAuthenticated, isLoading, error, verifyPin } = useAuth()
  const { showSplash, completeSplash } = useSplashScreen()

  if (showSplash) {
    return <SplashScreen onComplete={completeSplash} />
  }

  // Show PIN input if not authenticated (priority check)
  if (!isAuthenticated) {
    return (
      <main className="h-screen w-full bg-background">
        <PinAuth onVerify={verifyPin} isLoading={isLoading} error={error} />
      </main>
    )
  }

  // Show loading state only during initial auth check
  if (isLoading) {
    return (
      <main className="h-screen w-full bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
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
