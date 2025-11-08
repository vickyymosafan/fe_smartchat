"use client"

import { Button } from "@/components/ui/button"
import { Settings, Trash2, Search, Menu } from "lucide-react"

interface ChatHeaderProps {
  onResetChat?: () => void
  onToggleSidebar?: () => void
}

export default function ChatHeader({ onResetChat, onToggleSidebar }: ChatHeaderProps) {
  return (
    <div className="border-b border-border bg-background px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* Hamburger menu untuk mobile */}
        <Button
          size="icon"
          variant="ghost"
          onClick={onToggleSidebar}
          className="h-8 w-8 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-foreground">Chat</h2>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 sm:h-8 sm:w-8"
        >
          <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
        {onResetChat && (
          <Button
            size="icon"
            variant="ghost"
            onClick={onResetChat}
            className="h-7 w-7 sm:h-8 sm:w-8"
          >
            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        )}
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 sm:h-8 sm:w-8"
        >
          <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  )
}
