import { AUTH_TOKEN_KEY, LAST_ACTIVE_KEY, INACTIVE_TIMEOUT_MS } from "./constants"
import { clearSessionId } from "./session"

export function getAuthToken(): string | null {
	if (typeof window === "undefined") return null
	return sessionStorage.getItem(AUTH_TOKEN_KEY)
}

export function setAuthToken(token: string): void {
	if (typeof window === "undefined") return
	sessionStorage.setItem(AUTH_TOKEN_KEY, token)
	sessionStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString())
}

export function clearAuthToken(): void {
	if (typeof window === "undefined") return
	sessionStorage.removeItem(AUTH_TOKEN_KEY)
	sessionStorage.removeItem(LAST_ACTIVE_KEY)
	// Also clear chat session on logout for security
	clearSessionId()
}

export function isSessionExpired(): boolean {
	if (typeof window === "undefined") return true
	
	const lastActiveTime = sessionStorage.getItem(LAST_ACTIVE_KEY)
	if (!lastActiveTime) return true
	
	const elapsed = Date.now() - parseInt(lastActiveTime, 10)
	return elapsed > INACTIVE_TIMEOUT_MS
}

export function updateLastActive(): void {
	if (typeof window === "undefined") return
	sessionStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString())
}

export function checkAndRestoreSession(): boolean {
	if (typeof window === "undefined") return false
	
	const token = getAuthToken()
	if (!token) return false
	
	if (isSessionExpired()) {
		clearAuthToken()
		return false
	}
	
	updateLastActive()
	return true
}
