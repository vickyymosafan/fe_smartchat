"use client"

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface PinAuthProps {
  onVerify: (pin: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

const PIN_LENGTH = 6

export default function PinAuth({ onVerify, isLoading, error }: PinAuthProps) {
  const [pins, setPins] = useState<string[]>(Array(PIN_LENGTH).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  // Auto-submit when all pins filled
  useEffect(() => {
    const allFilled = pins.every((pin) => pin !== "")
    if (allFilled && !isLoading) {
      const fullPin = pins.join("")
      onVerify(fullPin)
    }
  }, [pins, isLoading, onVerify])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return

    const newPins = [...pins]
    newPins[index] = value

    setPins(newPins)

    // Auto-advance to next input
    if (value && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault()
      
      const newPins = [...pins]
      
      if (pins[index]) {
        // Clear current box
        newPins[index] = ""
        setPins(newPins)
      } else if (index > 0) {
        // Move to previous box and clear it
        newPins[index - 1] = ""
        setPins(newPins)
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    
    const pastedData = e.clipboardData.getData("text").trim()
    
    // Only allow 6 digits
    if (!/^\d{6}$/.test(pastedData)) return

    const newPins = pastedData.split("")
    setPins(newPins)
    
    // Focus last input
    inputRefs.current[PIN_LENGTH - 1]?.focus()
  }

  const handleReset = () => {
    setPins(Array(PIN_LENGTH).fill(""))
    inputRefs.current[0]?.focus()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Title */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground">SmartChat</h1>
          <p className="text-muted-foreground">Masukkan PIN untuk melanjutkan</p>
        </div>

        {/* PIN Input */}
        <div className="space-y-4">
          <div className="flex justify-center gap-2 sm:gap-3">
            {pins.map((pin, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={pin}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                disabled={isLoading}
                className={`
                  w-12 h-14 sm:w-14 sm:h-16 
                  text-center text-2xl font-bold
                  rounded-lg border-2
                  transition-all duration-200
                  ${pin ? "border-primary bg-primary/5" : "border-border"}
                  ${error ? "border-destructive" : ""}
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
                aria-label={`PIN digit ${index + 1}`}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center">
              <p className="text-sm text-destructive">{error}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="mt-2"
              >
                Coba Lagi
              </Button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Memverifikasi PIN...</span>
            </div>
          )}
        </div>

        {/* Helper Text */}
        <div className="text-center text-xs text-muted-foreground">
          <p>PIN terdiri dari 6 digit angka</p>
        </div>
      </div>
    </div>
  )
}
