import { API_BASE_URL, createHeaders } from "./api-config"

export interface ChatHistory {
	id: string
	sessionId: string
	title: string
	createdAt: string
	updatedAt: string
}

async function handleResponse<T>(response: Response, errorMessage: string): Promise<T> {
	if (!response.ok) {
		const error = await response.json()
		throw new Error(error.message || errorMessage)
	}
	const result = await response.json()
	return result.data
}

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

	return handleResponse<ChatHistory>(response, "Failed to create chat history")
}

export async function getChatHistories(): Promise<ChatHistory[]> {
	const response = await fetch(
		`${API_BASE_URL}/api/chat/histories`,
		{
			headers: createHeaders(),
		}
	)

	return handleResponse<ChatHistory[]>(response, "Failed to get chat histories")
}

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

	return handleResponse<ChatHistory>(response, "Failed to rename chat history")
}

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
