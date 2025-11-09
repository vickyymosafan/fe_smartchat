"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function ServiceWorkerRegister() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      // Register service worker
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("[App] Service Worker registered:", registration.scope)

          // Check for updates every 60 seconds
          setInterval(() => {
            registration.update()
          }, 60000)

          // Handle updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing
            console.log("[App] New service worker found")

            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                console.log("[App] Service worker state:", newWorker.state)

                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  // New version available
                  console.log("[App] New version available!")
                  setWaitingWorker(newWorker)
                  setShowUpdatePrompt(true)
                }
              })
            }
          })

          // Listen for messages from service worker
          navigator.serviceWorker.addEventListener("message", (event) => {
            if (event.data && event.data.type === "SW_UPDATED") {
              console.log("[App] Service worker updated:", event.data.message)
              // Auto-reload after SW update
              window.location.reload()
            }
          })

          // Check if there's a waiting worker on initial load
          if (registration.waiting) {
            setWaitingWorker(registration.waiting)
            setShowUpdatePrompt(true)
          }
        })
        .catch((error) => {
          console.error("[App] Service Worker registration failed:", error)
        })

      // Listen for controller change (new SW activated)
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("[App] Controller changed - reloading page")
        window.location.reload()
      })
    }
  }, [])

  const handleUpdate = () => {
    if (waitingWorker) {
      console.log("[App] Activating new service worker")
      // Tell the waiting service worker to skip waiting
      waitingWorker.postMessage({ type: "SKIP_WAITING" })
      setShowUpdatePrompt(false)
    }
  }

  if (!showUpdatePrompt) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="rounded-lg border border-border bg-card p-4 shadow-lg animate-in slide-in-from-bottom-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2">
            <RefreshCw className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-sm text-card-foreground">
              Update Tersedia
            </h3>
            <p className="text-xs text-muted-foreground">
              Versi baru aplikasi tersedia. Refresh untuk mendapatkan fitur terbaru.
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <Button onClick={handleUpdate} className="flex-1 text-xs" size="sm">
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
            Update Sekarang
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowUpdatePrompt(false)}
            className="text-xs"
            size="sm"
          >
            Nanti
          </Button>
        </div>
      </div>
    </div>
  )
}
