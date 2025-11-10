"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Settings, Menu } from "lucide-react"
import { headerPadding, iconSizes, gaps } from "@/lib/styles"
import { cn } from "@/lib/utils"
import { usePWAInstall } from "@/hooks/usePWAInstall"
import PWAInstallModal from "./pwa-install-modal"
import { APP_CONFIG } from "@/lib/app-config"

interface ChatHeaderProps {
  onToggleSidebar?: () => void
  title?: string
  onSettingsClick?: () => void
  showSettings?: boolean
}

export default function ChatHeader({ 
  onToggleSidebar,
  title = APP_CONFIG.branding.chatTitle,
  onSettingsClick,
  showSettings = true,
}: ChatHeaderProps) {
  const [showInstallModal, setShowInstallModal] = useState(false)
  const { canInstall, isInstalled, deviceType, installPWA } = usePWAInstall()

  const handleSettingsClick = () => {
    if (onSettingsClick) {
      onSettingsClick()
    } else {
      console.log("Settings clicked", { canInstall, isInstalled, deviceType })
      setShowInstallModal(true)
    }
  }

  return (
    <>
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
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-foreground">{title}</h2>
        </div>
        
        {showSettings && (
          <div className={cn("flex items-center", gaps.sm)}>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleSettingsClick}
              className="h-7 w-7 sm:h-8 sm:w-8"
            >
              <Settings className={iconSizes.sm} />
            </Button>
          </div>
        )}
      </div>

      <PWAInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        onInstall={installPWA}
        deviceType={deviceType}
        canInstall={canInstall}
        isInstalled={isInstalled}
      />
    </>
  )
}
