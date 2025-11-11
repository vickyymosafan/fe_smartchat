"use client"

import { useSplashScreen } from "@/hooks/useSplashScreen"
import ChatbotInterface from "@/components/chatbot-interface"
import SplashScreen from "@/components/splash-screen"

export default function Home() {
  const { showSplash, completeSplash } = useSplashScreen()

  // Show splash screen on first visit
  if (showSplash) {
    return <SplashScreen onComplete={completeSplash} />
  }

  // Show chat interface directly (no authentication required)
  return (
    <main className="h-screen w-full bg-background">
      <ChatbotInterface />
    </main>
  )
}
