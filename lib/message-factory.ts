import type { ChatMessage, ChatRole } from "@/types/chat"
import { generateId } from "./id-generator"

export function createMessage(
	role: ChatRole,
	content: string,
	metadata?: { fromCache?: boolean }
): ChatMessage {
	return {
		id: generateId(),
		role,
		content,
		timestamp: new Date(),
		...(metadata && { metadata }),
	}
}
