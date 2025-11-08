/**
 * Message Factory
 * Centralized message creation untuk menghindari duplikasi
 */

import type { ChatMessage, ChatRole } from "@/types/chat";

/**
 * Generate unique ID untuk message
 * Menggunakan kombinasi timestamp dan random number
 */
export function generateMessageId(): string {
	return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create chat message dengan ID dan timestamp otomatis
 */
export function createMessage(role: ChatRole, content: string): ChatMessage {
	return {
		id: generateMessageId(),
		role,
		content,
		timestamp: new Date(),
	};
}
