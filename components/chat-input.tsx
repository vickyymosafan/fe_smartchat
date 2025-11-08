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
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120)
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
    <div className="border-t border-border bg-background px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex gap-3 items-end rounded-lg border border-border bg-card p-3">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanyakan sesuatu... (Ctrl + Enter untuk kirim)"
            className="resize-none border-0 bg-transparent p-0 focus-visible:ring-0 min-h-[24px] max-h-[120px] text-sm flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            size="icon"
            className="h-8 w-8 flex-shrink-0 rounded-lg bg-primary hover:bg-primary/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>

        <p className="mt-2 text-xs text-muted-foreground text-center">Smartchat Assistant siap membantu Anda</p>
      </div>
    </div>
  )
}
