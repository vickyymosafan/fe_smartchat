/**
 * Chat History API
 * API functions untuk chat history management
 */

import { API_BASE_URL, createHeaders } from "./api-config"

export interface ChatHistory {
	id: string
	sessionId: string
	title: string
	createdAt: string
	updatedAt: string
}

/**
 * Create new chat history from first message
 */
export async function createChatHistory(
	sessionId: string,
	firstMessage: string
): Promise<ChatHistory> {
	const response = await fetch(`${API_BASE_URL}/api/chat/histories`, {
		method: "POST",
		headers: createHeaders(),
		body: JSON.stringify({
			sessionId,
			firstMessage,
		}),
	})

	if (!response.ok) {
		const error = await response.json()
		throw new Error(error.message || "Failed to create chat history")
	}

	const result = await response.json()
	return result.data
}

/**
 * Get all chat histories (across all sessions)
 */
export async function getChatHistories(): Promise<ChatHistory[]> {
	const response = await fetch(
		`${API_BASE_URL}/api/chat/histories`,
		{
			headers: createHeaders(),
		}
	)

	if (!response.ok) {
		const error = await response.json()
		throw new Error(error.message || "Failed to get chat histories")
	}

	const result = await response.json()
	return result.data
}

/**
 * Rename chat history
 */
export async function renameChatHistory(
	id: string,
	newTitle: string
): Promise<ChatHistory> {
	const response = await fetch(`${API_BASE_URL}/api/chat/histories/${id}`, {
		method: "PATCH",
		headers: createHeaders(),
		body: JSON.stringify({
			title: newTitle,
		}),
	})

	if (!response.ok) {
		const error = await response.json()
		throw new Error(error.message || "Failed to rename chat history")
	}

	const result = await response.json()
	return result.data
}

/**
 * Delete chat history
 */
export async function deleteChatHistory(id: string): Promise<void> {
	const response = await fetch(`${API_BASE_URL}/api/chat/histories/${id}`, {
		method: "DELETE",
		headers: createHeaders(),
	})

	if (!response.ok) {
		const error = await response.json()
		throw new Error(error.message || "Failed to delete chat history")
	}
}
