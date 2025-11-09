"use client"

import { useState, useEffect } from "react"
import { verifyPin as verifyPinAPI } from "@/lib/auth-api"

const AUTH_TOKEN_KEY = "auth_token"

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
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    
    if (token) {
      // Token exists, assume authenticated
      // Backend will validate on API calls
      setIsAuthenticated(true)
    }
    
    setIsLoading(false)
  }, [])

  const verifyPin = async (pin: string): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const token = await verifyPinAPI(pin)
      
      // Store token in localStorage
      localStorage.setItem(AUTH_TOKEN_KEY, token)
      
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
    localStorage.removeItem(AUTH_TOKEN_KEY)
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
