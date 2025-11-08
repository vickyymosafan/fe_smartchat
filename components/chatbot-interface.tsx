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
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <ChatHeader onResetChat={handleResetChat} />
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto bg-background px-4 py-6 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-4xl space-y-6">
            {messages.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {error && (
                  <div className="flex justify-center">
                    <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                      {error}
                    </div>
                  </div>
                )}
              </>
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-muted px-4 py-3">
                  <div className="flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                    <div
                      className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
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
    <div className="flex h-full flex-col items-center justify-center gap-6 py-12 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Smartchat Assistant</h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          Mulai percakapan dengan AI untuk bantuan, saran, dan pertanyaan
        </p>
      </div>
      <div className="grid w-full max-w-2xl grid-cols-1 gap-3 px-4 sm:grid-cols-2">
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
    <button className="rounded-lg border border-border bg-card px-4 py-3 text-left text-sm text-card-foreground transition-colors hover:bg-muted hover:border-border/60">
      {text}
    </button>
  )
}
