/**
 * API Interceptor
 * Global fetch wrapper that handles authentication errors
 * Emits events for 401 responses to trigger logout
 */

import { clearAuthToken } from "./auth-session"

// Custom event for token expiration
export const TOKEN_EXPIRED_EVENT = "token-expired"

/**
 * Emit token expired event
 * This will be caught by useAuth to trigger logout
 */
function emitTokenExpired(): void {
	if (typeof window !== "undefined") {
		window.dispatchEvent(new CustomEvent(TOKEN_EXPIRED_EVENT))
	}
}

/**
 * Enhanced fetch wrapper with 401 handling
 * Automatically handles token expiration and triggers logout
 */
export async function fetchWithAuth(
	url: string,
	options: RequestInit = {}
): Promise<Response> {
	try {
		const response = await fetch(url, options)

		// Handle 401 Unauthorized - token expired
		if (response.status === 401) {
			console.warn("[API Interceptor] 401 Unauthorized - Token expired")
			
			// Clear token immediately
			clearAuthToken()
			
			// Emit event to trigger logout in useAuth
			emitTokenExpired()
		}

		return response
	} catch (error) {
		// Network errors or other fetch failures
		throw error
	}
}
