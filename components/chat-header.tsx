"use client"

import { Button } from "@/components/ui/button"
import { Settings, Trash2, Search, Menu } from "lucide-react"
import { headerPadding, iconSizes, gaps } from "@/lib/styles"
import { cn } from "@/lib/utils"

interface ChatHeaderProps {
  onResetChat?: () => void
  onToggleSidebar?: () => void
}

export default function ChatHeader({ onResetChat, onToggleSidebar }: ChatHeaderProps) {
  return (
    <div className={cn("border-b border-border bg-background flex items-center justify-between", headerPadding)}>
      <div className={cn("flex items-center", gaps.md)}>
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
      
      <div className={cn("flex items-center", gaps.sm)}>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 sm:h-8 sm:w-8"
        >
          <Search className={iconSizes.sm} />
        </Button>
        {onResetChat && (
          <Button
            size="icon"
            variant="ghost"
            onClick={onResetChat}
            className="h-7 w-7 sm:h-8 sm:w-8"
          >
            <Trash2 className={iconSizes.sm} />
          </Button>
        )}
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 sm:h-8 sm:w-8"
        >
          <Settings className={iconSizes.sm} />
        </Button>
      </div>
    </div>
  )
}
