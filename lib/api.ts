import type {
	ChatApiRequest,
	ChatApiResponse,
	ChatApiError,
} from "@/types/chat";
import { API_BASE_URL, createHeaders } from "./api-config";
import { getSessionId } from "./session";

export async function sendChatMessage(message: string, sessionId?: string): Promise<string> {
	try {
		const sid = sessionId || getSessionId();
		
		const response = await fetch(`${API_BASE_URL}/api/chat`, {
			method: "POST",
			headers: createHeaders(true),
			body: JSON.stringify({
				message,
				userId: sid,
			} as ChatApiRequest),
		});

		if (!response.ok) {
			const errorData: ChatApiError | null = await response
				.json()
				.catch(() => null);

			const errorMessage =
				errorData?.message ||
				`HTTP ${response.status}: ${response.statusText}`;

			throw new Error(errorMessage);
		}

		const data: ChatApiResponse = await response.json();
		const aiResponse = data.data;

		if (typeof aiResponse === "string") {
			return aiResponse;
		}

		if (typeof aiResponse === "object" && aiResponse !== null) {
			if ("output" in aiResponse && typeof aiResponse.output === "string") {
				return aiResponse.output;
			}

			if ("message" in aiResponse && typeof aiResponse.message === "string") {
				return aiResponse.message;
			}

			if ("text" in aiResponse && typeof aiResponse.text === "string") {
				return aiResponse.text;
			}

			if ("response" in aiResponse && typeof aiResponse.response === "string") {
				return aiResponse.response;
			}

			return JSON.stringify(aiResponse);
		}

		return String(aiResponse);
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}

		throw new Error("Terjadi kesalahan yang tidak diketahui");
	}
}

interface ChatHistoryMessage {
	id: string
	role: string
	content: string
	createdAt: string
}

export async function loadChatHistory(
	sessionId?: string,
	limit?: number
): Promise<ChatHistoryMessage[]> {
	const sid = sessionId || getSessionId();
	const url = new URL(`${API_BASE_URL}/api/chat/history/${sid}`);
	
	if (limit) {
		url.searchParams.append("limit", limit.toString());
	}

	const response = await fetch(url.toString(), {
		method: "GET",
		headers: createHeaders(true),
	});

	if (!response.ok) {
		throw new Error(`Failed to load chat history: ${response.statusText}`);
	}

	const data = await response.json();
	return data.data?.messages || [];
}
