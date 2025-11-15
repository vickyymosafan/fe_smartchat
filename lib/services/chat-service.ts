/**
 * Chat service implementation
 * Concrete implementation of IChatService interface
 * 
 * This service depends on the IChatService abstraction and implements it.
 * It uses low-level API functions but exposes a clean interface to high-level modules.
 */

import type { IChatService } from "@/types/services"
import type { ChatMessage, ChatApiResponse, ChatApiError } from "@/types/chat"
import { API_BASE_URL, createHeaders } from "../api-config"
import { getSessionId } from "../session"
import { convertBackendMessages } from "../message-converter"
import { parseAIResponse } from "../response-parser"

export class ChatService implements IChatService {
	async sendMessage(message: string, sessionId?: string): Promise<string> {
		try {
			const sid = sessionId || getSessionId()
			
			const response = await fetch(`${API_BASE_URL}/api/chat`, {
				method: "POST",
				headers: createHeaders(),
				body: JSON.stringify({
					message,
					sessionId: sid,
				}),
			})

			if (!response.ok) {
				let errorData: ChatApiError | null = null
				
				try {
					errorData = await response.json()
				} catch (e) {
					// Failed to parse error response
				}

				const errorMessage =
					errorData?.message ||
					`HTTP ${response.status}: ${response.statusText}`

				throw new Error(errorMessage)
			}

			const data: ChatApiResponse = await response.json()
			return parseAIResponse(data.data)
		} catch (error) {
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

		console.log('[ChatService.loadHistory] Request:', { 
			sessionId: sid, 
			url: url.toString() 
		})

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: createHeaders(),
		})

		if (!response.ok) {
			console.error('[ChatService.loadHistory] Failed:', response.status)
			throw new Error(`Failed to load chat history: ${response.statusText}`)
		}

		const data = await response.json()
		console.log('[ChatService.loadHistory] Response:', { 
			sessionId: sid,
			dataStructure: {
				ok: data.ok,
				hasData: !!data.data,
				messageCount: data.data?.messages?.length || 0,
				sessionIdInResponse: data.data?.sessionId
			},
			fullData: data
		})
		
		const messages = data.data?.messages || []
		const converted = convertBackendMessages(messages)
		
		console.log('[ChatService.loadHistory] Converted:', { 
			sessionId: sid,
			originalCount: messages.length,
			convertedCount: converted.length,
			firstMessage: converted[0] || null
		})
		
		return converted
	}
}

// Export singleton instance
export const chatService = new ChatService()
