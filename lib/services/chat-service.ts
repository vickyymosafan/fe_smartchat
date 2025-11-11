/**
 * Chat service implementation
 * Concrete implementation of IChatService interface
 * 
 * This service depends on the IChatService abstraction and implements it.
 * It uses low-level API functions but exposes a clean interface to high-level modules.
 */

import type { IChatService } from "@/types/services"
import type { ChatMessage, ChatApiRequest, ChatApiResponse, ChatApiError } from "@/types/chat"
import { API_BASE_URL, createHeaders } from "../api-config"
import { getSessionId } from "../session"
import { convertBackendMessages } from "../message-converter"
import { parseAIResponse } from "../response-parser"

export class ChatService implements IChatService {
	async sendMessage(message: string, sessionId?: string): Promise<string> {
		try {
			const sid = sessionId || getSessionId()
			
			console.log('[ChatService] Sending message:', { 
				url: `${API_BASE_URL}/api/chat`,
				sessionId: sid,
				messageLength: message.length 
			})
			
			const response = await fetch(`${API_BASE_URL}/api/chat`, {
				method: "POST",
				headers: createHeaders(),
				body: JSON.stringify({
					message,
					userId: sid,
				} as ChatApiRequest),
			})

			console.log('[ChatService] Response status:', response.status)

			if (!response.ok) {
				let errorData: ChatApiError | null = null
				let errorText = ''
				
				try {
					errorText = await response.text()
					errorData = JSON.parse(errorText)
				} catch (e) {
					console.error('[ChatService] Failed to parse error response:', errorText)
				}

				const errorMessage =
					errorData?.message ||
					`HTTP ${response.status}: ${response.statusText}`

				console.error('[ChatService] Error response:', {
					status: response.status,
					statusText: response.statusText,
					errorData,
					rawText: errorText
				})
				throw new Error(errorMessage)
			}

			const data: ChatApiResponse = await response.json()
			console.log('[ChatService] Success response received')
			return parseAIResponse(data.data)
		} catch (error) {
			console.error('[ChatService] Exception:', error)
			if (error instanceof Error) {
				throw error
			}

			throw new Error("Terjadi kesalahan yang tidak diketahui")
		}
	}

	async loadHistory(sessionId?: string, limit?: number): Promise<ChatMessage[]> {
		const sid = sessionId || getSessionId()
		const url = new URL(`${API_BASE_URL}/api/chat/history/${sid}`)
		
		if (limit) {
			url.searchParams.append("limit", limit.toString())
		}

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: createHeaders(),
		})

		if (!response.ok) {
			throw new Error(`Failed to load chat history: ${response.statusText}`)
		}

		const data = await response.json()
		const messages = data.data?.messages || []
		
		return convertBackendMessages(messages)
	}
}

// Export singleton instance
export const chatService = new ChatService()
