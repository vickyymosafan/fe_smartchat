"use client"

import type { ChatMessage as ChatMessageType } from "@/types/chat"
import type { MessageComponentProps } from "@/types/components"
import MarkdownContent from "./markdown/markdown-content"

interface ChatMessageProps extends Omit<MessageComponentProps, 'message'> {
  message: ChatMessageType
}

export default function ChatMessage({ message, className }: ChatMessageProps) {
  const isUser = message.role === "user"
  const isError = message.role === "error"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} ${className || ""}`}>
      <div
        className={`${
          isUser
            ? "max-w-[90%] sm:max-w-xl md:max-w-2xl rounded-lg bg-primary text-primary-foreground px-3 py-2.5 sm:px-4 sm:py-3"
            : isError
            ? "max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl rounded-lg bg-destructive/10 border border-destructive/20 text-destructive px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-3.5"
            : "w-full bg-transparent text-foreground"
        }`}
      >
        {isUser ? (
          <p className="text-xs sm:text-sm md:text-base break-words">{message.content}</p>
        ) : isError ? (
          <div className="space-y-1.5 sm:space-y-2">
            <p className="text-xs sm:text-sm font-semibold">⚠️ Error</p>
            <p className="text-xs sm:text-sm break-words">{message.content}</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base w-full">
            <MarkdownContent content={message.content} />
          </div>
        )}
      </div>
    </div>
  )
}
