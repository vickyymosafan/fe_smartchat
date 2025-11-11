import { SESSION_ID_KEY } from "./constants"
import { generateIdWithPrefix } from "./id-generator"
import { sessionStorage } from "./storage"

export function getSessionId(): string {
	let sessionId = sessionStorage.getItem(SESSION_ID_KEY)

	if (!sessionId) {
		sessionId = generateIdWithPrefix("session")
		sessionStorage.setItem(SESSION_ID_KEY, sessionId)
	}

	return sessionId
}

export function clearSessionId(): void {
	sessionStorage.removeItem(SESSION_ID_KEY)
}

export function resetSessionId(): string {
	clearSessionId()
	return getSessionId()
}
