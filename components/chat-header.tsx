"use client"

import { Button } from "@/components/ui/button"
import { Settings, Trash2, Search } from "lucide-react"

interface ChatHeaderProps {
  onResetChat?: () => void
}

export default function ChatHeader({ onResetChat }: ChatHeaderProps) {
  return (
    <header className="border-b border-border bg-background flex-shrink-0">
      <div className="flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-foreground truncate">Chat</h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate">Smartchat Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <Button size="icon" variant="ghost" className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-muted-foreground hover:text-foreground">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-muted-foreground hover:text-foreground"
            onClick={onResetChat}
            title="Reset Chat"
          >
            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
