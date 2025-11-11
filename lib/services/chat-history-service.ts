/**
 * Chat history service implementation
 * Concrete implementation of IChatHistoryService interface
 */

import type { IChatHistoryService, ChatHistory } from "@/types/services"
import { API_BASE_URL, createHeaders, handleApiResponse } from "../api-config"

export class ChatHistoryService implements IChatHistoryService {
	async getAll(): Promise<ChatHistory[]> {
		const response = await fetch(
			`${API_BASE_URL}/api/chat/histories`,
			{
				headers: createHeaders(),
			}
		)

		return handleApiResponse<ChatHistory[]>(response, "Failed to get chat histories")
	}

	async create(sessionId: string, firstMessage: string): Promise<ChatHistory> {
		const response = await fetch(`${API_BASE_URL}/api/chat/histories`, {
			method: "POST",
			headers: createHeaders(),
			body: JSON.stringify({
				sessionId,
				firstMessage,
			}),
		})

		return handleApiResponse<ChatHistory>(response, "Failed to create chat history")
	}

	async rename(id: string, newTitle: string): Promise<ChatHistory> {
		const response = await fetch(`${API_BASE_URL}/api/chat/histories/${id}`, {
			method: "PATCH",
			headers: createHeaders(),
			body: JSON.stringify({
				title: newTitle,
			}),
		})

		return handleApiResponse<ChatHistory>(response, "Failed to rename chat history")
	}

	async delete(id: string): Promise<void> {
		const response = await fetch(`${API_BASE_URL}/api/chat/histories/${id}`, {
			method: "DELETE",
			headers: createHeaders(),
		})

		if (!response.ok) {
			const error = await response.json().catch(() => ({ message: "Failed to delete chat history" }))
			throw new Error(error.message || "Failed to delete chat history")
		}
	}
}

// Export singleton instance
export const chatHistoryService = new ChatHistoryService()
