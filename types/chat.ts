export type ChatRole = "user" | "ai" | "error";

export interface ChatMessage {
	id: string;
	role: ChatRole;
	content: string;
	timestamp: Date;
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