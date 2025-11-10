/**
 * Role dalam percakapan chat
 */
export type ChatRole = "user" | "ai" | "error";

/**
 * Struktur data untuk satu pesan chat
 */
export interface ChatMessage {
	/** Unique identifier untuk message */
	id: string;

	/** Role pengirim pesan */
	role: ChatRole;

	/** Konten teks pesan */
	content: string;

	/** Timestamp kapan pesan dibuat */
	timestamp: Date;
}

/**
 * Request body untuk POST /api/chat
 * Sesuai dengan backend chatRequestSchema
 * userId is used as sessionId by backend
 */
export interface ChatApiRequest {
	message: string;
	userId?: string; // Used as sessionId for chat history
	metadata?: Record<string, any>;
}

/**
 * Response dari POST /api/chat
 * Backend mengembalikan { ok: true, data: any }
 */
export interface ChatApiResponse {
	ok: boolean;
	data: any;
}

/**
 * Error response dari backend
 */
export interface ChatApiError {
	ok: false;
	code: string;
	message: string;
	details?: any;
}

/**
 * Helper type untuk create message
 */
export type CreateMessageParams = Omit<ChatMessage, "id" | "timestamp">;