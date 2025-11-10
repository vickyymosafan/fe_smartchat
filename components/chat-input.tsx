"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { containerMaxWidth, textSizes, gaps, iconSizes } from "@/lib/styles"
import { cn } from "@/lib/utils"
import { APP_CONFIG } from "@/lib/app-config"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
  placeholder?: string
  helperText?: string
  maxHeight?: number
}

export default function ChatInput({ 
  onSendMessage, 
  isLoading,
  placeholder = APP_CONFIG.chat.placeholder,
  helperText = APP_CONFIG.chat.helperText,
  maxHeight = APP_CONFIG.chat.maxInputHeight,
}: ChatInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, maxHeight) + "px"
    }
  }, [message, maxHeight])

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter tanpa Shift = kirim pesan
    // Shift + Enter = baris baru
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault() // Prevent default new line
      handleSend()
    }
  }

  return (
    <div className="border-t border-border bg-background px-3 py-3 sm:px-4 sm:py-4 md:px-6 lg:px-8 flex-shrink-0">
      <div className={cn("mx-auto", containerMaxWidth)}>
        <div className={cn("flex items-center rounded-lg border border-border bg-card p-2 sm:p-3", gaps.md)}>
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn("resize-none border-0 bg-transparent p-0 focus-visible:ring-0 min-h-[24px] flex-1", textSizes.base)}
            style={{ maxHeight: `${maxHeight}px` }}
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 flex-shrink-0 rounded-lg bg-primary hover:bg-primary/90 active:scale-95 transition-transform"
          >
            <Send className={iconSizes.sm} />
          </Button>
        </div>

        {helperText && (
          <p className={cn("mt-1.5 sm:mt-2 text-muted-foreground text-center", textSizes.xs)}>{helperText}</p>
        )}
      </div>
    </div>
  )
}
