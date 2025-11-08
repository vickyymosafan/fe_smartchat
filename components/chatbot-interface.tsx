"use client"

import ChatMessage from "@/components/chat-message"
import ChatInput from "@/components/chat-input"
import ChatHeader from "@/components/chat-header"
import Sidebar from "@/components/sidebar"
import { useChat } from "@/hooks/useChat"
import { useAutoScroll } from "@/hooks/useAutoScroll"

export default function ChatbotInterface() {
  // Gunakan custom hooks untuk state management
  const { messages, isLoading, error, sendMessage, resetChat } = useChat()
  const { scrollRef } = useAutoScroll(messages)

  const handleSendMessage = async (content: string) => {
    await sendMessage(content)
  }

  const handleResetChat = () => {
    resetChat()
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <ChatHeader onResetChat={handleResetChat} />
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto bg-background px-3 py-4 sm:px-4 sm:py-6 md:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl space-y-4 sm:space-y-6">
            {messages.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {error && (
                  <div className="flex justify-center">
                    <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-destructive max-w-full">
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
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 sm:gap-6 py-8 sm:py-12 text-center px-4">
      <div className="space-y-1.5 sm:space-y-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Smartchat Assistant</h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md mx-auto">
          Mulai percakapan dengan AI untuk bantuan, saran, dan pertanyaan
        </p>
      </div>
      <div className="grid w-full max-w-xl lg:max-w-2xl grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
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
