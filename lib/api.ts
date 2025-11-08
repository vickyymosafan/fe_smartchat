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
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Validasi environment variable
if (!API_BASE_URL) {
	throw new Error(
		"NEXT_PUBLIC_API_BASE_URL tidak dikonfigurasi. " +
			"Silakan tambahkan variabel ini di file .env.local",
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

		// Return data AI response
		return data.data;
	} catch (error) {
		// Re-throw Error objects (termasuk network errors dan HTTP errors)
		if (error instanceof Error) {
			throw error;
		}

		// Handle unexpected errors
		throw new Error("Terjadi kesalahan yang tidak diketahui");
	}
}
