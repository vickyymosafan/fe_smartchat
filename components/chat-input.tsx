"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px"
    }
  }, [message])

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSend()
    }
  }

  return (
    <div className="border-t border-border bg-background px-3 py-3 sm:px-4 sm:py-4 md:px-6 lg:px-8 flex-shrink-0">
      <div className="mx-auto max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <div className="flex gap-2 sm:gap-3 items-center rounded-lg border border-border bg-card p-2 sm:p-3">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanyakan sesuatu... (Ctrl + Enter untuk kirim)"
            className="resize-none border-0 bg-transparent p-0 focus-visible:ring-0 min-h-[24px] max-h-[120px] text-xs sm:text-sm md:text-base flex-1 placeholder:text-center"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 flex-shrink-0 rounded-lg bg-primary hover:bg-primary/90 active:scale-95 transition-transform"
          >
            <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
          </Button>
        </div>

        <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-muted-foreground text-center">Smartchat Assistant siap membantu Anda</p>
      </div>
    </div>
  )
}
