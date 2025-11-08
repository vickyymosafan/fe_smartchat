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

/**
 * Base URL untuk Backend API
 * Dibaca dari environment variable NEXT_PUBLIC_API_BASE_URL
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

// Validasi environment variable
if (!API_BASE_URL) {
	throw new Error(
		"NEXT_PUBLIC_API_BASE_URL tidak dikonfigurasi atau kosong. " +
			"Silakan tambahkan variabel ini di file .env.local dengan URL backend yang valid. " +
			"Contoh: NEXT_PUBLIC_API_BASE_URL=https://be-chatsmart.vercel.app",
	);
}

// Warning untuk production jika tidak menggunakan HTTPS
if (
	typeof window !== "undefined" &&
	process.env.NODE_ENV === "production" &&
	!API_BASE_URL.startsWith("https://")
) {
	console.warn(
		"⚠️ WARNING: Backend API tidak menggunakan HTTPS di production environment. " +
			"Ini tidak aman dan dapat menyebabkan masalah keamanan. " +
			"Gunakan HTTPS untuk production.",
	);
}

/**
 * Mengirim pesan chat ke Backend API dan mendapatkan respons AI
 *
 * @param message - Pesan dari user yang akan dikirim
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
export async function sendChatMessage(message: string): Promise<string> {
	try {
		// Kirim POST request ke backend
		const response = await fetch(`${API_BASE_URL}/api/chat`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				message,
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
