import { SESSION_ID_KEY } from "./constants"

function generateSessionId(): string {
	const timestamp = Date.now()
	const random = Math.random().toString(36).substring(2, 9)
	return `session-${timestamp}-${random}`
}

export function getSessionId(): string {
	if (typeof window === "undefined") {
		return generateSessionId()
	}

	let sessionId = sessionStorage.getItem(SESSION_ID_KEY)

	if (!sessionId) {
		sessionId = generateSessionId()
		sessionStorage.setItem(SESSION_ID_KEY, sessionId)
	}

	return sessionId
}

function clearSessionId(): void {
	if (typeof window !== "undefined") {
		sessionStorage.removeItem(SESSION_ID_KEY)
	}
}

export function resetSessionId(): string {
	clearSessionId()
	return getSessionId()
}
