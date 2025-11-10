import { getAuthToken } from "./auth-session"

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:3001"

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
