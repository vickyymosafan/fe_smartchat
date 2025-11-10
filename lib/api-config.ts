/**
 * API Configuration
 * Centralized API base URL configuration
 */

/**
 * Base URL untuk Backend API
 * Dibaca dari environment variable NEXT_PUBLIC_API_BASE_URL
 * Default: http://localhost:3001 untuk development
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:3001";

// Warning untuk production jika tidak menggunakan HTTPS
if (
	typeof window !== "undefined" &&
	process.env.NODE_ENV === "production" &&
	!API_BASE_URL.startsWith("https://")
) {
	console.warn(
		"⚠️ WARNING: Backend API tidak menggunakan HTTPS di production environment. " +
			"Ini tidak aman dan dapat menyebabkan masalah keamanan. " +
			"Gunakan HTTPS untuk production.",
	);
}

/**
 * Get auth token from sessionStorage
 */
export function getAuthToken(): string | null {
	if (typeof window === "undefined") return null;
	return sessionStorage.getItem("auth_token");
}

/**
 * Create headers for API requests
 */
export function createHeaders(includeAuth: boolean = true): HeadersInit {
	const headers: HeadersInit = {
		"Content-Type": "application/json",
	};

	if (includeAuth) {
		const token = getAuthToken();
		if (token) {
			headers["Authorization"] = `Bearer ${token}`;
		}
	}

	return headers;
}
