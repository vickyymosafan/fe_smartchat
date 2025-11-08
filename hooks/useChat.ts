/**
 * Custom Hook untuk Chat State Management
 * Mengelola state pesan, loading, error, dan logika pengiriman pesan
 */

"use client";

import { useState } from "react";
import type { ChatMessage } from "@/types/chat";
import { sendChatMessage } from "@/lib/api";
import { createMessage } from "@/lib/message-factory";

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
		const userMessage = createMessage("user", content);
		setMessages((prev) => [...prev, userMessage]);
		setIsLoading(true);
		setError(null);

		try {
			// Panggil API service untuk mendapatkan respons AI
			const aiResponse = await sendChatMessage(content);
			
			// Tambahkan respons AI ke state
			const aiMessage = createMessage("ai", aiResponse);
			setMessages((prev) => [...prev, aiMessage]);
		} catch (error) {
			// Handle error: tambahkan pesan error ke chat
			const errorContent = error instanceof Error ? error.message : "Terjadi kesalahan, silakan coba lagi";
			const errorMessage = createMessage("error", errorContent);
			
			setMessages((prev) => [...prev, errorMessage]);
			setError(errorContent);
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
