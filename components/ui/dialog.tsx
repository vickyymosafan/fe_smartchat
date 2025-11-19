"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { Button } from "./button"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!open || !mounted) return null

  // Use Portal to render outside parent DOM hierarchy
  // This prevents CSS containment issues (overflow-hidden, etc.)
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative bg-[#1a1a1a] rounded-lg shadow-2xl w-full max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-2rem)] md:max-w-md lg:max-w-lg max-h-[90vh] overflow-y-auto z-[101]">
        {children}
      </div>
    </div>,
    document.body
  )
}

interface DialogContentProps {
  children: React.ReactNode
  onClose: () => void
}

export function DialogContent({ children, onClose }: DialogContentProps) {
  return (
    <div className="relative p-4 sm:p-5 md:p-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute right-3 top-3 sm:right-4 sm:top-4 h-6 w-6 sm:h-7 sm:w-7"
      >
        <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </Button>
      {children}
    </div>
  )
}

interface DialogHeaderProps {
  children: React.ReactNode
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return <div className="mb-3 sm:mb-4">{children}</div>
}

interface DialogTitleProps {
  children: React.ReactNode
}

export function DialogTitle({ children }: DialogTitleProps) {
  return <h2 className="text-lg sm:text-xl font-semibold text-[#f5f5f5] pr-6 sm:pr-8">{children}</h2>
}

interface DialogDescriptionProps {
  children: React.ReactNode
}

export function DialogDescription({ children }: DialogDescriptionProps) {
  return <p className="text-xs sm:text-sm text-[#d0d0d0] mt-1.5 sm:mt-2">{children}</p>
}
