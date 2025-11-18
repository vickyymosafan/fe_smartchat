"use client"

import { Button } from "@/components/ui/button"
import { Settings, Menu } from "lucide-react"
import { headerPadding, iconSizes, gaps } from "@/lib/styles"
import { cn } from "@/lib/utils"
import { APP_CONFIG } from "@/lib/app-config"
import Link from "next/link"

interface ChatHeaderProps {
  onToggleSidebar?: () => void
}

export default function ChatHeader({ 
  onToggleSidebar,
}: ChatHeaderProps) {
  return (
    <div className={cn("border-b border-border bg-background flex items-center justify-between", headerPadding)}>
      <div className={cn("flex items-center", gaps.md)}>
        <Button
          size="icon"
          variant="ghost"
          onClick={onToggleSidebar}
          className="h-8 w-8 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-foreground">{APP_CONFIG.branding.chatTitle}</h2>
      </div>
      
      <div className={cn("flex items-center", gaps.sm)}>
        <Link href="/settings">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 sm:h-8 sm:w-8"
          >
            <Settings className={iconSizes.sm} />
          </Button>
        </Link>
      </div>
    </div>
  )
}
