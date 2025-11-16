"use client"

import type { ChatMessage as ChatMessageType } from "@/types/chat"
import type { MessageComponentProps } from "@/types/components"
import MarkdownContent from "./markdown/markdown-content"
import { messageMaxWidth } from "@/lib/styles"
import { cn } from "@/lib/utils"

interface ChatMessageProps extends Omit<MessageComponentProps, 'message'> {
  message: ChatMessageType
}

export default function ChatMessage({ message, className }: ChatMessageProps) {
  const isUser = message.role === "user"
  const isError = message.role === "error"
  const fromCache = message.metadata?.fromCache

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start", className)}>
      <div
        className={cn(
          messageMaxWidth,
          isUser
            ? "rounded-lg bg-primary text-primary-foreground px-3 py-2.5 sm:px-4 sm:py-3"
            : isError
            ? "rounded-lg bg-destructive/10 border border-destructive/20 text-destructive px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-3.5"
            : "bg-transparent text-foreground w-full"
        )}
      >
        {isUser ? (
          <p className="text-xs sm:text-sm md:text-base break-words">{message.content}</p>
        ) : isError ? (
          <div className="space-y-1.5 sm:space-y-2">
            <p className="text-xs sm:text-sm font-semibold">⚠️ Error</p>
            <p className="text-xs sm:text-sm break-words">{message.content}</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base">
            <MarkdownContent content={message.content} />
            {fromCache && (
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground/70 mt-2 pt-2 border-t border-border/30">
                <span className="text-yellow-500">⚡</span>
                <span>Instant response</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
