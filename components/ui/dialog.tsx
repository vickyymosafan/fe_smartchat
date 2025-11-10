"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Button } from "./button"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative bg-[#1a1a1a] rounded-lg shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

interface DialogContentProps {
  children: React.ReactNode
  onClose: () => void
}

export function DialogContent({ children, onClose }: DialogContentProps) {
  return (
    <div className="relative p-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute right-4 top-4 h-6 w-6"
      >
        <X className="h-4 w-4" />
      </Button>
      {children}
    </div>
  )
}

interface DialogHeaderProps {
  children: React.ReactNode
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return <div className="mb-4">{children}</div>
}

interface DialogTitleProps {
  children: React.ReactNode
}

export function DialogTitle({ children }: DialogTitleProps) {
  return <h2 className="text-xl font-semibold text-[#f5f5f5]">{children}</h2>
}

interface DialogDescriptionProps {
  children: React.ReactNode
}

export function DialogDescription({ children }: DialogDescriptionProps) {
  return <p className="text-sm text-[#d0d0d0] mt-2">{children}</p>
}
