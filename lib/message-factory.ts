import type { ChatMessage, ChatRole } from "@/types/chat";

function generateMessageId(): string {
	return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function createMessage(role: ChatRole, content: string): ChatMessage {
	return {
		id: generateMessageId(),
		role,
		content,
		timestamp: new Date(),
	};
}
