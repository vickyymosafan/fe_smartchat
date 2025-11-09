"use client"

import { useState, useEffect } from "react"
import { verifyPin as verifyPinAPI } from "@/lib/auth-api"

// Storage keys
const AUTH_TOKEN_KEY = "auth_token"
const LAST_ACTIVE_KEY = "last_active_time"

// Timeout duration: 5 minutes of inactivity
const INACTIVE_TIMEOUT_MS = 5 * 60 * 1000

interface UseAuthReturn {
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  verifyPin: (pin: string) => Promise<void>
  logout: () => void
}

export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check for existing token on mount
  useEffect(() => {
    // Use sessionStorage instead of localStorage
    // Token will be cleared when browser/tab/PWA is closed
    const token = sessionStorage.getItem(AUTH_TOKEN_KEY)
    const lastActiveTime = sessionStorage.getItem(LAST_ACTIVE_KEY)
    
    if (token && lastActiveTime) {
      const elapsed = Date.now() - parseInt(lastActiveTime, 10)
      
      // Check if session expired due to inactivity
      if (elapsed > INACTIVE_TIMEOUT_MS) {
        // Session expired, clear token
        sessionStorage.removeItem(AUTH_TOKEN_KEY)
        sessionStorage.removeItem(LAST_ACTIVE_KEY)
        setIsAuthenticated(false)
      } else {
        // Token exists and not expired, assume authenticated
        // Backend will validate on API calls
        setIsAuthenticated(true)
        // Update last active time
        sessionStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString())
      }
    }
    
    setIsLoading(false)
  }, [])

  // Track page visibility for auto-logout on inactivity
  useEffect(() => {
    if (!isAuthenticated) return

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Page became visible, check if session expired
        const lastActiveTime = sessionStorage.getItem(LAST_ACTIVE_KEY)
        
        if (lastActiveTime) {
          const elapsed = Date.now() - parseInt(lastActiveTime, 10)
          
          if (elapsed > INACTIVE_TIMEOUT_MS) {
            // Session expired due to inactivity, auto logout
            console.log("[Auth] Session expired due to inactivity")
            logout()
          } else {
            // Update last active time
            sessionStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString())
          }
        }
      } else {
        // Page became hidden, update last active time
        sessionStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString())
      }
    }

    // Update last active time on user activity
    const updateActivity = () => {
      if (isAuthenticated) {
        sessionStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString())
      }
    }

    // Listen for visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange)
    
    // Listen for user activity (mouse, keyboard, touch)
    window.addEventListener("mousemove", updateActivity)
    window.addEventListener("keydown", updateActivity)
    window.addEventListener("touchstart", updateActivity)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("mousemove", updateActivity)
      window.removeEventListener("keydown", updateActivity)
      window.removeEventListener("touchstart", updateActivity)
    }
  }, [isAuthenticated])

  const verifyPin = async (pin: string): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const token = await verifyPinAPI(pin)
      
      // Store token in sessionStorage (cleared on browser/tab/PWA close)
      sessionStorage.setItem(AUTH_TOKEN_KEY, token)
      sessionStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString())
      
      setIsAuthenticated(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "PIN verification failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = (): void => {
    sessionStorage.removeItem(AUTH_TOKEN_KEY)
    sessionStorage.removeItem(LAST_ACTIVE_KEY)
    setIsAuthenticated(false)
    setError(null)
  }

  return {
    isAuthenticated,
    isLoading,
    error,
    verifyPin,
    logout,
  }
}
