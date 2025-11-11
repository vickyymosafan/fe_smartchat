import { SESSION_ID_KEY } from "./constants"
import { generateIdWithPrefix } from "./id-generator"
import { sessionStorageAdapter } from "./storage"

export function getSessionId(): string {
	let sessionId = sessionStorageAdapter.getItem(SESSION_ID_KEY)

	if (!sessionId) {
		sessionId = generateIdWithPrefix("session")
		sessionStorageAdapter.setItem(SESSION_ID_KEY, sessionId)
	}

	return sessionId
}

export function clearSessionId(): void {
	sessionStorageAdapter.removeItem(SESSION_ID_KEY)
}

export function resetSessionId(): string {
	clearSessionId()
	return getSessionId()
}
