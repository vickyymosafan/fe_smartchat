"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { APP_CONFIG } from "@/lib/app-config"
import { usePinInput } from "@/hooks/usePinInput"

interface PinAuthProps {
  onVerify: (pin: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

export default function PinAuth({ 
  onVerify, 
  isLoading, 
  error,
}: PinAuthProps) {
  const {
    pins,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste,
    reset: handleReset,
  } = usePinInput({
    length: APP_CONFIG.auth.pinLength,
    onComplete: (pin) => {
      if (!isLoading) {
        onVerify(pin)
      }
    },
    autoSubmit: true,
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        {/* Logo/Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center space-y-2"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4 shadow-lg shadow-primary/50"
          >
            <svg
              className="w-10 h-10 text-white"
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
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
          >
            {APP_CONFIG.branding.appName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground"
          >
            {APP_CONFIG.auth.pinPrompt}
          </motion.p>
        </motion.div>

        {/* PIN Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex justify-center gap-2 sm:gap-3">
            {pins.map((pin, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05, type: "spring", stiffness: 200 }}
              >
                <motion.input
                  ref={(el) => { inputRefs.current[index] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={pin}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  disabled={isLoading}
                  whileFocus={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    w-12 h-14 sm:w-14 sm:h-16 
                    text-center text-2xl font-bold
                    rounded-xl border-2
                    transition-all duration-300
                    ${pin ? "border-primary bg-primary/10 shadow-lg shadow-primary/20" : "border-border bg-card"}
                    ${error ? "border-destructive animate-shake" : ""}
                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:shadow-xl focus:shadow-primary/30
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                  aria-label={`PIN digit ${index + 1}`}
                />
              </motion.div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.p
                animate={{ x: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="text-sm text-destructive font-medium"
              >
                {error}
              </motion.p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="mt-2 hover:bg-destructive/10"
              >
                {APP_CONFIG.auth.retryButtonText}
              </Button>
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 text-muted-foreground"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">{APP_CONFIG.auth.verifyingText}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Helper Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-muted-foreground space-y-1"
        >
          <p>{APP_CONFIG.auth.pinHelperText}</p>
          <p className="text-[10px]">{APP_CONFIG.auth.pinTip}</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
