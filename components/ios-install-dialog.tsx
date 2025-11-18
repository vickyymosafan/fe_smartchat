"use client"

import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"
import IOSInstallInstructions from "./ios-install-instructions"

interface IOSInstallDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function IOSInstallDialog({ open, onOpenChange }: IOSInstallDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in">
        <div className="fixed bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-2xl border-t border-border bg-card p-4 sm:p-5 md:p-6 shadow-2xl animate-in slide-in-from-bottom-5">
          <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="rounded-lg bg-primary/10 p-1.5 sm:p-2 flex-shrink-0">
                <Download className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm sm:text-base text-card-foreground">
                  Install Smartchat
                </h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  Tambahkan ke Home Screen
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          <IOSInstallInstructions />

          <Button
            onClick={() => onOpenChange(false)}
            className="w-full mt-3 sm:mt-4 text-xs sm:text-sm"
            variant="outline"
          >
            Mengerti
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
