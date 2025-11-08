/**
 * Custom Hook untuk Chat State Management
 * Mengelola state pesan, loading, error, dan logika pengiriman pesan
 */

"use client";

import { useState } from "react";
import type { ChatMessage } from "@/types/chat";
import { sendChatMessage } from "@/lib/api";

/**
 * Return type untuk useChat hook
 */
interface UseChatReturn {
	messages: ChatMessage[];
	isLoading: boolean;
	error: string | null;
	sendMessage: (content: string) => Promise<void>;
	resetChat: () => void;
}

/**
 * Generate unique ID untuk message
 * Menggunakan kombinasi timestamp dan random number
 */
function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Custom hook untuk mengelola state dan logika chat
 *
 * Responsibilities:
 * - Manage messages array state
 * - Manage loading state
 * - Manage error state
 * - Provide sendMessage function
 * - Call API service
 * - Handle optimistic updates
 *
 * @returns Object berisi messages, isLoading, error, dan sendMessage function
 *
 * @example
 * const { messages, isLoading, error, sendMessage } = useChat();
 *
 * // Kirim pesan
 * await sendMessage("Halo, apa kabar?");
 */
export function useChat(): UseChatReturn {
	// State management
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Fungsi untuk mengirim pesan ke AI
	 * Menggunakan optimistic update untuk UX yang lebih baik
	 */
	const sendMessage = async (content: string): Promise<void> => {
		// Optimistic update: tambahkan pesan user langsung ke state
		const userMessage: ChatMessage = {
			id: generateId(),
			role: "user",
			content,
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setIsLoading(true);
		setError(null);

		try {
			// Panggil API service untuk mendapatkan respons AI
			const aiResponse = await sendChatMessage(content);

			// Tambahkan respons AI ke state
			const aiMessage: ChatMessage = {
				id: generateId(),
				role: "ai",
				content: aiResponse,
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, aiMessage]);
		} catch (error) {
			// Handle error: tambahkan pesan error ke chat
			const errorMessage: ChatMessage = {
				id: generateId(),
				role: "error",
				content:
					error instanceof Error
						? error.message
						: "Terjadi kesalahan, silakan coba lagi",
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, errorMessage]);
			setError(
				error instanceof Error
					? error.message
					: "Terjadi kesalahan, silakan coba lagi",
			);
		} finally {
			// Selalu set loading ke false setelah selesai
			setIsLoading(false);
		}
	};

	/**
	 * Reset chat (obrolan baru)
	 */
	const resetChat = (): void => {
		setMessages([]);
		setError(null);
		setIsLoading(false);
	};

	return {
		messages,
		isLoading,
		error,
		sendMessage,
		resetChat,
	};
}
