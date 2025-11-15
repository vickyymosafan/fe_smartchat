"use client"

import ChatMessage from "@/components/chat-message"
import ChatInput from "@/components/chat-input"
import ChatHeader from "@/components/chat-header"
import Sidebar from "@/components/sidebar"
import { useChat } from "@/hooks/useChat"
import { useAutoScroll } from "@/hooks/useAutoScroll"
import { useResponsiveSidebar } from "@/hooks/useResponsiveSidebar"
import { useState } from "react"
import { messageMaxWidth, containerPadding, textSizes, gaps } from "@/lib/styles"
import { cn } from "@/lib/utils"
import { APP_CONFIG } from "@/lib/app-config"

export default function ChatbotInterface() {
  const { isOpen: isSidebarOpen, toggle: toggleSidebar } = useResponsiveSidebar({
    breakpoint: APP_CONFIG.breakpoints.mobile,
  })
  const [refreshHistoryTrigger, setRefreshHistoryTrigger] = useState(0)

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
        <ChatHeader onToggleSidebar={toggleSidebar} />
        <div 
          ref={scrollRef}
          className={cn("flex-1 overflow-y-auto bg-background", containerPadding)}
        >
          <div className={cn("mx-auto space-y-4 sm:space-y-6 h-full w-full", messageMaxWidth)}>
            {isLoadingHistory ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                  <p className="text-sm text-muted-foreground">{APP_CONFIG.chat.loadingText}</p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <EmptyState 
                title={APP_CONFIG.branding.appTitle}
                description={APP_CONFIG.branding.tagline}
                suggestions={[...APP_CONFIG.chat.suggestions]}
                onSuggestionClick={sendMessage}
              />
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {error && (
                  <div className="flex justify-center w-full">
                    <div className={cn("rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2.5 sm:px-4 sm:py-3 text-destructive w-full", textSizes.sm)}>
                      {error}
                    </div>
                  </div>
                )}
              </>
            )}
            {isLoading && (
              <div className="flex justify-start w-full">
                <div className="rounded-lg bg-muted px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground font-medium">Thinking</span>
                    <div className="flex gap-1">
                      <span className="animate-bounce" style={{ animationDelay: "0s" }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
                    </div>
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

interface EmptyStateProps {
  title?: string
  description?: string
  suggestions?: string[]
  onSuggestionClick?: (suggestion: string) => void
}

function EmptyState({ 
  title = "Smartchat Assistant",
  description = "Mulai percakapan dengan AI untuk bantuan, saran, dan pertanyaan",
  suggestions = [],
  onSuggestionClick
}: EmptyStateProps) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-3 xs:gap-4 sm:gap-6 py-6 xs:py-8 sm:py-12 text-center px-3 xs:px-4">
      <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">{title}</h1>
        <p className="text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground max-w-xs xs:max-w-sm sm:max-w-md mx-auto">
          {description}
        </p>
      </div>
      {suggestions.length > 0 && (
        <div className={cn("grid w-full max-w-xs xs:max-w-sm sm:max-w-xl lg:max-w-2xl grid-cols-1 sm:grid-cols-2", gaps.md)}>
          {suggestions.map((text, index) => (
            <SuggestionCard 
              key={index} 
              text={text} 
              onClick={onSuggestionClick ? () => onSuggestionClick(text) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface SuggestionCardProps {
  text: string
  onClick?: () => void
}

function SuggestionCard({ text, onClick }: SuggestionCardProps) {
  return (
    <button 
      onClick={onClick}
      className="rounded-lg border border-border bg-card px-2.5 py-2 xs:px-3 xs:py-2.5 sm:px-4 sm:py-3 text-left text-[10px] xs:text-xs sm:text-sm md:text-base text-card-foreground transition-colors hover:bg-muted hover:border-border/60 active:scale-95"
    >
      {text}
    </button>
  )
}
