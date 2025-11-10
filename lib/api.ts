/**
 * API Service Layer
 * Abstraksi untuk komunikasi HTTP dengan Backend API
 * Menangani request/response transformation dan error handling
 */

import type {
	ChatApiRequest,
	ChatApiResponse,
	ChatApiError,
} from "@/types/chat";
import { API_BASE_URL, createHeaders } from "./api-config";
import { getSessionId } from "./session";

/**
 * Mengirim pesan chat ke Backend API dan mendapatkan respons AI
 *
 * @param message - Pesan dari user yang akan dikirim
 * @param sessionId - Optional session ID, jika tidak ada akan ambil dari storage
 * @returns Promise yang resolve dengan respons AI sebagai string
 * @throws Error jika terjadi kesalahan network, HTTP error, atau error lainnya
 *
 * @example
 * try {
 *   const response = await sendChatMessage("Halo, apa kabar?");
 *   console.log(response); // "Halo! Saya baik, terima kasih..."
 * } catch (error) {
 *   console.error("Gagal mengirim pesan:", error.message);
 * }
 */
export async function sendChatMessage(message: string, sessionId?: string): Promise<string> {
	try {
		// Get session ID for chat history persistence
		const sid = sessionId || getSessionId();
		
		// Kirim POST request ke backend
		const response = await fetch(`${API_BASE_URL}/api/chat`, {
			method: "POST",
			headers: createHeaders(true),
			body: JSON.stringify({
				message,
				userId: sid, // Backend uses userId as sessionId
			} as ChatApiRequest),
		});

		// Handle HTTP errors (4xx, 5xx)
		if (!response.ok) {
			// Coba parse error response dari backend
			const errorData: ChatApiError | null = await response
				.json()
				.catch(() => null);

			// Gunakan pesan error dari backend jika ada, atau buat pesan default
			const errorMessage =
				errorData?.message ||
				`HTTP ${response.status}: ${response.statusText}`;

			throw new Error(errorMessage);
		}

		// Parse response sukses
		const data: ChatApiResponse = await response.json();

		// Extract AI response dari data
		// N8n webhook bisa return object dengan berbagai format:
		// - { output: "text" } - format n8n AI Agent
		// - "text" - direct string
		// - { message: "text" } - format lain
		const aiResponse = data.data;

		// Handle berbagai format response
		if (typeof aiResponse === "string") {
			return aiResponse;
		}

		// Jika object, coba extract text dari berbagai kemungkinan field
		if (typeof aiResponse === "object" && aiResponse !== null) {
			// N8n AI Agent format
			if ("output" in aiResponse && typeof aiResponse.output === "string") {
				return aiResponse.output;
			}

			// Format message
			if ("message" in aiResponse && typeof aiResponse.message === "string") {
				return aiResponse.message;
			}

			// Format text
			if ("text" in aiResponse && typeof aiResponse.text === "string") {
				return aiResponse.text;
			}

			// Format response
			if ("response" in aiResponse && typeof aiResponse.response === "string") {
				return aiResponse.response;
			}

			// Jika tidak ada field yang dikenali, stringify object
			return JSON.stringify(aiResponse);
		}

		// Fallback: convert to string
		return String(aiResponse);
	} catch (error) {
		// Re-throw Error objects (termasuk network errors dan HTTP errors)
		if (error instanceof Error) {
			throw error;
		}

		// Handle unexpected errors
		throw new Error("Terjadi kesalahan yang tidak diketahui");
	}
}

/**
 * Load chat history from backend
 * 
 * @param sessionId - Session ID to load history for
 * @param limit - Optional limit for number of messages
 * @returns Promise with array of messages
 */
export async function loadChatHistory(
	sessionId?: string,
	limit?: number
): Promise<any[]> {
	try {
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
	} catch (error) {
		console.error("Failed to load chat history:", error);
		return [];
	}
}
