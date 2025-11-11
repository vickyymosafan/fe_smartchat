import { getAuthToken } from "./auth-session"

/**
 * API Base URL Configuration
 * Reads from NEXT_PUBLIC_API_BASE_URL environment variable
 * 
 * Development (.env.local): http://localhost:3001
 * Production: https://be-chatsmart.vercel.app
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "https://be-chatsmart.vercel.app"

// Log current API URL in development for debugging
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
	console.log("🔗 API Base URL:", API_BASE_URL)
}

// Warn if using HTTP in production
if (
	typeof window !== "undefined" &&
	process.env.NODE_ENV === "production" &&
	!API_BASE_URL.startsWith("https://")
) {
	console.warn(
		"⚠️ WARNING: Backend API tidak menggunakan HTTPS di production environment. " +
			"Ini tidak aman dan dapat menyebabkan masalah keamanan. " +
			"Gunakan HTTPS untuk production.",
	)
}

export function createHeaders(includeAuth: boolean = true): HeadersInit {
	const headers: HeadersInit = {
		"Content-Type": "application/json",
	}

	if (includeAuth) {
		const token = getAuthToken()
		if (token) {
			headers["Authorization"] = `Bearer ${token}`
		}
	}

	return headers
}
