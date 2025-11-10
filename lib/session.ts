import { SESSION_ID_KEY } from "./constants"
import { generateIdWithPrefix } from "./id-generator"

export function getSessionId(): string {
	if (typeof window === "undefined") {
		return generateIdWithPrefix("session")
	}

	let sessionId = sessionStorage.getItem(SESSION_ID_KEY)

	if (!sessionId) {
		sessionId = generateIdWithPrefix("session")
		sessionStorage.setItem(SESSION_ID_KEY, sessionId)
	}

	return sessionId
}

export function clearSessionId(): void {
	if (typeof window !== "undefined") {
		sessionStorage.removeItem(SESSION_ID_KEY)
	}
}

export function resetSessionId(): string {
	clearSessionId()
	return getSessionId()
}
