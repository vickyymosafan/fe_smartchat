"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Download, Share, Plus } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

type DeviceType = "android" | "ios" | "desktop" | "unknown"

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [deviceType, setDeviceType] = useState<DeviceType>("unknown")
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent.toLowerCase()
    const isIOS = /iphone|ipad|ipod/.test(userAgent)
    const isAndroid = /android/.test(userAgent)
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    const isIOSStandalone = (window.navigator as any).standalone === true

    if (isStandalone || isIOSStandalone) {
      setIsInstalled(true)
      return
    }

    if (isIOS) {
      setDeviceType("ios")
    } else if (isAndroid) {
      setDeviceType("android")
    } else {
      setDeviceType("desktop")
    }

    // Check if user has dismissed the prompt before
    const dismissed = localStorage.getItem("pwa-install-dismissed")
    const dismissedTime = dismissed ? parseInt(dismissed) : 0
    const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24)

    // Show prompt again after 7 days
    if (daysSinceDismissed < 7) {
      return
    }

    // Listen for beforeinstallprompt event (Android/Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // For iOS, show manual instructions after a delay
    if (isIOS && !isIOSStandalone) {
      const timer = setTimeout(() => {
        setShowPrompt(true)
      }, 3000) // Show after 3 seconds

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
    localStorage.setItem("pwa-install-dismissed", Date.now().toString())
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

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Untuk menginstall aplikasi ini di iPhone Anda:
              </p>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    1
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm text-card-foreground">
                      Tap tombol <strong>Share</strong> <Share className="inline h-4 w-4 mx-1" /> 
                      di bagian bawah browser Safari
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    2
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm text-card-foreground">
                      Scroll ke bawah dan tap <strong>"Add to Home Screen"</strong> <Plus className="inline h-4 w-4 mx-1" />
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    3
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm text-card-foreground">
                      Tap <strong>"Add"</strong> di pojok kanan atas
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 p-3 border border-border">
                <p className="text-xs text-muted-foreground">
                  💡 <strong>Tips:</strong> Setelah diinstall, Anda bisa membuka ChatSmart langsung dari Home Screen seperti aplikasi native!
                </p>
              </div>

              <Button
                onClick={handleDismiss}
                className="w-full"
                variant="outline"
              >
                Mengerti
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
