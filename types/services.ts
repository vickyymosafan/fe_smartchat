/**
 * Service interfaces (abstractions) for DIP compliance
 * 
 * DEPENDENCY INVERSION PRINCIPLE:
 * - High-level modules (hooks, components) depend on these abstractions
 * - Low-level modules (service implementations) also depend on these abstractions
 * - Abstractions do not depend on details; details depend on abstractions
 * 
 * BENEFITS:
 * - Easy to test (mock implementations)
 * - Easy to swap implementations (REST → GraphQL, add caching, etc.)
 * - Clear separation of concerns
 * - No tight coupling between layers
 */

import type { ChatMessage, ParsedAIResponse } from "./chat"

/**
 * Chat service abstraction
 * Defines contract for chat operations without implementation details
 */
export interface IChatService {
	sendMessage(message: string, sessionId?: string): Promise<ParsedAIResponse>
	loadHistory(sessionId?: string, limit?: number): Promise<ChatMessage[]>
}

/**
 * Chat history service abstraction
 * Defines contract for chat history CRUD operations
 */
export interface IChatHistoryService {
	getAll(): Promise<ChatHistory[]>
	create(sessionId: string, firstMessage: string): Promise<ChatHistory>
	rename(id: string, newTitle: string): Promise<ChatHistory>
	delete(id: string): Promise<void>
}

/**
 * Chat history entity
 */
export interface ChatHistory {
	id: string
	sessionId: string
	title: string
	createdAt: string
	updatedAt: string
}
