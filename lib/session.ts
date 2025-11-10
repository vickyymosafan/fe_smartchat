/**
 * Session Management
 * Handle session ID generation and persistence
 */

const SESSION_ID_KEY = "chat_session_id";

/**
 * Generate unique session ID
 * Format: session-{timestamp}-{random}
 */
function generateSessionId(): string {
	const timestamp = Date.now();
	const random = Math.random().toString(36).substring(2, 9);
	return `session-${timestamp}-${random}`;
}

/**
 * Get or create session ID
 * Session ID is stored in sessionStorage and persists until browser/tab closes
 */
export function getSessionId(): string {
	if (typeof window === "undefined") {
		return generateSessionId();
	}

	let sessionId = sessionStorage.getItem(SESSION_ID_KEY);

	if (!sessionId) {
		sessionId = generateSessionId();
		sessionStorage.setItem(SESSION_ID_KEY, sessionId);
	}

	return sessionId;
}

/**
 * Clear session ID (for new chat)
 */
export function clearSessionId(): void {
	if (typeof window !== "undefined") {
		sessionStorage.removeItem(SESSION_ID_KEY);
	}
}

/**
 * Create new session ID (for reset chat)
 */
export function resetSessionId(): string {
	clearSessionId();
	return getSessionId();
}
