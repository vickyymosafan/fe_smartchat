"use client"

import { Button } from "@/components/ui/button"
import { Settings, Trash2, Search } from "lucide-react"

interface ChatHeaderProps {
  onResetChat?: () => void
}

export default function ChatHeader({ onResetChat }: ChatHeaderProps) {
  return (
    <header className="border-b border-border bg-background">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Chat</h1>
            <p className="text-xs text-muted-foreground">Smartchat Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground"
            onClick={onResetChat}
            title="Reset Chat"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
