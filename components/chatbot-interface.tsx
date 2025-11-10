"use client"

import ChatMessage from "@/components/chat-message"
import ChatInput from "@/components/chat-input"
import ChatHeader from "@/components/chat-header"
import Sidebar from "@/components/sidebar"
import { useChat } from "@/hooks/useChat"
import { useAutoScroll } from "@/hooks/useAutoScroll"
import { useState, useEffect } from "react"
import { containerMaxWidth, containerPadding, textSizes, gaps } from "@/lib/styles"
import { cn } from "@/lib/utils"

export default function ChatbotInterface() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [refreshHistoryTrigger, setRefreshHistoryTrigger] = useState(0)

  // Set sidebar terbuka di desktop, tertutup di mobile
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768)
    }
    
    // Set initial state
    handleResize()
    
    // Listen to resize events
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Callback to refresh history when new chat is created
  const handleHistoryCreated = () => {
    setRefreshHistoryTrigger(prev => prev + 1)
  }

  // Gunakan custom hooks untuk state management
  const { 
    messages, 
    isLoading, 
    isLoadingHistory, 
    error, 
    sendMessage, 
    resetChat,
    loadHistoryMessages,
    currentSessionId
  } = useChat({
    onHistoryCreated: handleHistoryCreated
  })
  const { scrollRef } = useAutoScroll(messages)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  
  const handleHistoryClick = async (sessionId: string) => {
    await loadHistoryMessages(sessionId)
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={toggleSidebar} 
        onNewChat={resetChat}
        refreshTrigger={refreshHistoryTrigger}
        onHistoryClick={handleHistoryClick}
        currentSessionId={currentSessionId}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <ChatHeader onResetChat={resetChat} onToggleSidebar={toggleSidebar} />
        <div 
          ref={scrollRef}
          className={cn("flex-1 overflow-y-auto bg-background", containerPadding)}
        >
          <div className={cn("mx-auto space-y-4 sm:space-y-6 h-full", containerMaxWidth)}>
            {isLoadingHistory ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                  <p className="text-sm text-muted-foreground">Memuat riwayat chat...</p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {error && (
                  <div className="flex justify-center">
                    <div className={cn("rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2.5 sm:px-4 sm:py-3 text-destructive max-w-full", textSizes.sm)}>
                      {error}
                    </div>
                  </div>
                )}
              </>
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-muted px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-muted-foreground animate-bounce" />
                    <div
                      className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 sm:gap-6 py-8 sm:py-12 text-center px-4">
      <div className="space-y-1.5 sm:space-y-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Smartchat Assistant</h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md mx-auto">
          Mulai percakapan dengan AI untuk bantuan, saran, dan pertanyaan
        </p>
      </div>
      <div className={cn("grid w-full max-w-xl lg:max-w-2xl grid-cols-1 sm:grid-cols-2", gaps.md)}>
        <SuggestionCard text="Tanyakan tentang coding" />
        <SuggestionCard text="Minta ide project" />
        <SuggestionCard text="Jelaskan konsep" />
        <SuggestionCard text="Bantu debug code" />
      </div>
    </div>
  )
}

function SuggestionCard({ text }: { text: string }) {
  return (
    <button className="rounded-lg border border-border bg-card px-3 py-2.5 sm:px-4 sm:py-3 text-left text-xs sm:text-sm md:text-base text-card-foreground transition-colors hover:bg-muted hover:border-border/60 active:scale-95">
      {text}
    </button>
  )
}
