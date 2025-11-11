"use client"

import { useState, useEffect } from "react"
import type { IAuthService } from "@/types/services"
import { authService } from "@/lib/services"
import { 
  checkAndRestoreSession, 
  setAuthToken, 
  clearAuthToken,
  updateLastActive,
  isSessionExpired
} from "@/lib/auth-session"

interface UseAuthProps {
  authService?: IAuthService
}

interface UseAuthReturn {
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  verifyPin: (pin: string) => Promise<void>
  logout: () => Promise<void>
}

export function useAuth(props?: UseAuthProps): UseAuthReturn {
  const { authService: injectedService = authService } = props || {}
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check for existing token on mount
  useEffect(() => {
    const isValid = checkAndRestoreSession()
    setIsAuthenticated(isValid)
    setIsLoading(false)
  }, [])

  // Listen for token expiration events from API interceptor
  useEffect(() => {
    const handleTokenExpired = () => {
      console.log("[Auth] Token expired event received - logging out")
      logout().catch(err => console.error("[Auth] Logout error:", err))
    }

    if (typeof window !== "undefined") {
      window.addEventListener("token-expired", handleTokenExpired)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("token-expired", handleTokenExpired)
      }
    }
  }, [])

  // Track page visibility for auto-logout on inactivity
  useEffect(() => {
    if (!isAuthenticated) return

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (isSessionExpired()) {
          console.log("[Auth] Session expired due to inactivity")
          logout().catch(err => console.error("[Auth] Logout error:", err))
        } else {
          updateLastActive()
        }
      } else {
        updateLastActive()
      }
    }

    const handleActivity = () => {
      if (isAuthenticated) {
        updateLastActive()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("mousemove", handleActivity)
    window.addEventListener("keydown", handleActivity)
    window.addEventListener("touchstart", handleActivity)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("mousemove", handleActivity)
      window.removeEventListener("keydown", handleActivity)
      window.removeEventListener("touchstart", handleActivity)
    }
  }, [isAuthenticated])

  const verifyPin = async (pin: string): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const token = await injectedService.verifyPin(pin)
      setAuthToken(token)
      setIsAuthenticated(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "PIN verification failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    console.log("[Auth] Logging out - clearing token and session")
    
    try {
      // Call backend logout endpoint first (with timeout)
      await Promise.race([
        injectedService.logout(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Logout timeout")), 3000)
        )
      ])
    } catch (err) {
      console.warn("[Auth] Backend logout failed:", err)
    } finally {
      // Always clear client-side token
      clearAuthToken()
      
      // Reload page to reset all state and show PIN screen
      if (typeof window !== "undefined") {
        window.location.reload()
      }
    }
  }

  return {
    isAuthenticated,
    isLoading,
    error,
    verifyPin,
    logout,
  }
}
