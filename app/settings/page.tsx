"use client"

import { ArrowLeft, Smartphone, Download, CheckCircle2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePWAInstall } from "@/hooks/usePWAInstall"
import { useState } from "react"
import Link from "next/link"
import IOSInstallDialog from "@/components/ios-install-dialog"

export default function SettingsPage() {
  const { canInstall, isInstalled, deviceType, installPWA } = usePWAInstall()
  const [showIOSDialog, setShowIOSDialog] = useState(false)

  const handleInstallClick = async () => {
    if (deviceType === "ios") {
      setShowIOSDialog(true)
    } else if (deviceType === "android" || deviceType === "desktop") {
      await installPWA()
    }
  }

  const getDeviceLabel = () => {
    switch (deviceType) {
      case "android":
        return "Android"
      case "ios":
        return "iOS"
      case "desktop":
        return "Desktop"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center gap-3 sm:gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <h1 className="text-base sm:text-lg font-semibold text-card-foreground">
              Settings
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-2xl">
        <div className="space-y-6 sm:space-y-8">
          {/* PWA Install Section */}
          <section className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2 sm:p-2.5">
                <Smartphone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base sm:text-lg font-semibold text-card-foreground mb-1">
                  Install Aplikasi
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Install Smartchat sebagai aplikasi untuk pengalaman yang lebih baik
                </p>
              </div>
            </div>

            {/* Device Info */}
            <div className="rounded-lg bg-muted/50 p-3 sm:p-4 mb-4 sm:mb-5 border border-border">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Info className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">
                  Device: <span className="font-medium text-card-foreground">{getDeviceLabel()}</span>
                </span>
              </div>
            </div>

            {/* Install Status & Action */}
            {isInstalled ? (
              <div className="flex items-center gap-2 sm:gap-3 rounded-lg bg-green-500/10 p-3 sm:p-4 border border-green-500/20">
                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-400">
                    Aplikasi Sudah Terinstall
                  </p>
                  <p className="text-[10px] sm:text-xs text-green-600/80 dark:text-green-500/80 mt-0.5">
                    Anda sudah menginstall aplikasi ini
                  </p>
                </div>
              </div>
            ) : canInstall ? (
              <div className="space-y-3 sm:space-y-4">
                <Button
                  onClick={handleInstallClick}
                  className="w-full text-sm sm:text-base h-10 sm:h-11"
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  {deviceType === "ios" ? "Lihat Cara Install" : "Install Sekarang"}
                </Button>

                {deviceType === "android" && (
                  <div className="rounded-lg bg-blue-500/10 p-3 sm:p-3.5 border border-blue-500/20">
                    <p className="text-[10px] sm:text-xs text-blue-700 dark:text-blue-400">
                      💡 Setelah klik tombol di atas, akan muncul dialog konfirmasi dari browser.
                      Klik "Install" atau "Add" untuk menginstall aplikasi.
                    </p>
                  </div>
                )}

                {deviceType === "ios" && (
                  <div className="rounded-lg bg-blue-500/10 p-3 sm:p-3.5 border border-blue-500/20">
                    <p className="text-[10px] sm:text-xs text-blue-700 dark:text-blue-400">
                      💡 iOS memerlukan langkah manual untuk install. Klik tombol di atas untuk
                      melihat panduan lengkap.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-lg bg-muted/50 p-3 sm:p-4 border border-border">
                <p className="text-xs sm:text-sm text-muted-foreground text-center">
                  Install tidak tersedia untuk browser ini
                </p>
              </div>
            )}
          </section>

          {/* App Info Section */}
          <section className="rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm">
            <h2 className="text-base sm:text-lg font-semibold text-card-foreground mb-3 sm:mb-4">
              Tentang Aplikasi
            </h2>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Nama</span>
                <span className="font-medium text-card-foreground">Smartchat AI Assistant</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Versi</span>
                <span className="font-medium text-card-foreground">3.0.3</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Developer</span>
                <span className="font-medium text-card-foreground">Vicky Mosafan</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* iOS Install Dialog */}
      <IOSInstallDialog open={showIOSDialog} onOpenChange={setShowIOSDialog} />
    </div>
  )
}
