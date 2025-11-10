import type { ChatMessage } from "@/types/chat"

export function convertBackendMessages(history: any[]): ChatMessage[] {
	return history.map((msg: any) => ({
		id: msg.id,
		role: msg.role === "assistant" ? "ai" : msg.role,
		content: msg.content,
		timestamp: new Date(msg.createdAt),
	}))
}
