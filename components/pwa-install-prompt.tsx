"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Download } from "lucide-react"
import { detectDeviceType, isAppInstalled, type DeviceType } from "@/lib/device-detection"
import { PWA_INSTALL_DISMISSED_KEY, PWA_INSTALL_COOLDOWN_DAYS } from "@/lib/constants"
import IOSInstallInstructions from "./ios-install-instructions"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [deviceType, setDeviceType] = useState<DeviceType>("unknown")
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    if (isAppInstalled()) {
      setIsInstalled(true)
      return
    }

    const device = detectDeviceType()
    setDeviceType(device)

    const dismissed = localStorage.getItem(PWA_INSTALL_DISMISSED_KEY)
    const dismissedTime = dismissed ? parseInt(dismissed) : 0
    const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24)

    if (daysSinceDismissed < PWA_INSTALL_COOLDOWN_DAYS) {
      return
    }

    // Listen for beforeinstallprompt event (Android/Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    if (device === "ios") {
      const timer = setTimeout(() => {
        setShowPrompt(true)
      }, 10000)

      return () => {
        clearTimeout(timer)
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      }
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setShowPrompt(false)
      setDeferredPrompt(null)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem(PWA_INSTALL_DISMISSED_KEY, Date.now().toString())
  }

  if (isInstalled || !showPrompt) return null

  return (
    <>
      {/* Android/Desktop Install Prompt */}
      {deviceType === "android" || deviceType === "desktop" ? (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
          <div className="rounded-lg border border-border bg-card p-4 shadow-lg animate-in slide-in-from-bottom-5">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2">
                <Download className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-sm text-card-foreground">
                  Install ChatSmart
                </h3>
                <p className="text-xs text-muted-foreground">
                  Install aplikasi ini untuk akses lebih cepat dan pengalaman yang lebih baik
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 flex-shrink-0"
                onClick={handleDismiss}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3 flex gap-2">
              <Button
                onClick={handleInstallClick}
                className="flex-1 text-xs"
                size="sm"
              >
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Install Sekarang
              </Button>
              <Button
                variant="outline"
                onClick={handleDismiss}
                className="text-xs"
                size="sm"
              >
                Nanti Saja
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* iOS Install Instructions */}
      {deviceType === "ios" ? (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="fixed bottom-0 left-0 right-0 rounded-t-2xl border-t border-border bg-card p-6 shadow-2xl animate-in slide-in-from-bottom-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-card-foreground">
                    Install ChatSmart
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Tambahkan ke Home Screen
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleDismiss}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <IOSInstallInstructions />

            <Button
              onClick={handleDismiss}
              className="w-full mt-4"
              variant="outline"
            >
              Mengerti
            </Button>
          </div>
        </div>
      ) : null}
    </>
  )
}
