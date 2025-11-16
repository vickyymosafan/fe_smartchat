export type ChatRole = "user" | "ai" | "error";

export interface ChatMessage {
	id: string;
	role: ChatRole;
	content: string;
	timestamp: Date;
	metadata?: {
		fromCache?: boolean;
	};
}

export interface ParsedAIResponse {
	content: string;
	fromCache: boolean;
}

export interface ChatApiRequest {
	message: string;
	sessionId?: string;
	metadata?: Record<string, any>;
}

export interface ChatApiResponse {
	ok: boolean;
	data: any;
}

export interface ChatApiError {
	ok: false;
	code: string;
	message: string;
	details?: any;
}