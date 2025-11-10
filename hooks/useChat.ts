/**
 * Custom Hook untuk Chat State Management
 * Mengelola state pesan, loading, error, dan logika pengiriman pesan
 */

"use client";

import { useState, useEffect, useRef } from "react";
import type { ChatMessage } from "@/types/chat";
import { sendChatMessage, loadChatHistory } from "@/lib/api";
import { createMessage } from "@/lib/message-factory";
import { resetSessionId } from "@/lib/session";
import { createChatHistory } from "@/lib/chat-history-api";

/**
 * Return type untuk useChat hook
 */
interface UseChatReturn {
	messages: ChatMessage[];
	isLoading: boolean;
	error: string | null;
	sendMessage: (content: string) => Promise<void>;
	resetChat: () => void;
	isLoadingHistory: boolean;
	onHistoryCreated?: () => void;
	loadHistoryMessages: (sessionId: string) => Promise<void>;
	currentSessionId: string | null;
}

/**
 * Props untuk useChat hook
 */
interface UseChatProps {
	onHistoryCreated?: () => void;
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
export function useChat(props?: UseChatProps): UseChatReturn {
	// State management
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
	const historyCreatedRef = useRef<boolean>(false);
	const { onHistoryCreated } = props || {};

	// Load chat history on mount
	useEffect(() => {
		const loadHistory = async () => {
			setIsLoadingHistory(true);
			try {
				const { getSessionId } = await import("@/lib/session");
				const sessionId = getSessionId();
				setCurrentSessionId(sessionId);
				
				const history = await loadChatHistory(sessionId);
				
				// Convert backend messages to frontend format
				const convertedMessages: ChatMessage[] = history.map((msg: any) => ({
					id: msg.id,
					role: msg.role === "assistant" ? "ai" : msg.role,
					content: msg.content,
					timestamp: new Date(msg.createdAt),
				}));

				setMessages(convertedMessages);
				
				// If has messages, mark history as created
				if (convertedMessages.length > 0) {
					historyCreatedRef.current = true;
				}
			} catch (err) {
				console.error("Failed to load chat history:", err);
				// Don't show error to user, just start with empty chat
			} finally {
				setIsLoadingHistory(false);
			}
		};

		loadHistory();
	}, []);

	/**
	 * Fungsi untuk mengirim pesan ke AI
	 * Menggunakan optimistic update untuk UX yang lebih baik
	 * Auto-create chat history on first message
	 */
	const sendMessage = async (content: string): Promise<void> => {
		// Optimistic update: tambahkan pesan user langsung ke state
		const userMessage = createMessage("user", content);
		setMessages((prev) => [...prev, userMessage]);
		setIsLoading(true);
		setError(null);

		try {
			// Get current session ID
			const sessionId = currentSessionId || (await import("@/lib/session")).getSessionId();
			
			// Auto-create chat history on first message
			if (messages.length === 0 && !historyCreatedRef.current) {
				try {
					await createChatHistory(sessionId, content);
					historyCreatedRef.current = true;
					
					// Notify parent component to refresh history list
					if (onHistoryCreated) {
						onHistoryCreated();
					}
				} catch (historyError) {
					console.error("Failed to create chat history:", historyError);
					// Don't block message sending if history creation fails
				}
			}

			// Panggil API service untuk mendapatkan respons AI dengan sessionId yang benar
			const aiResponse = await sendChatMessage(content, sessionId);
			
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
	 * Load messages from a specific history/session
	 */
	const loadHistoryMessages = async (sessionId: string): Promise<void> => {
		setIsLoadingHistory(true);
		setError(null);
		
		try {
			const history = await loadChatHistory(sessionId);
			
			// Convert backend messages to frontend format
			const convertedMessages: ChatMessage[] = history.map((msg: any) => ({
				id: msg.id,
				role: msg.role === "assistant" ? "ai" : msg.role,
				content: msg.content,
				timestamp: new Date(msg.createdAt),
			}));

			setMessages(convertedMessages);
			setCurrentSessionId(sessionId);
			
			// Mark history as created if has messages
			historyCreatedRef.current = convertedMessages.length > 0;
			
			// Update session storage to this session
			if (typeof window !== "undefined") {
				sessionStorage.setItem("chat_session_id", sessionId);
			}
		} catch (err) {
			console.error("Failed to load history messages:", err);
			setError("Gagal memuat riwayat chat");
		} finally {
			setIsLoadingHistory(false);
		}
	};

	/**
	 * Reset chat (obrolan baru)
	 * Creates new session ID for fresh chat
	 */
	const resetChat = (): void => {
		const newSessionId = resetSessionId(); // Create new session
		setMessages([]);
		setError(null);
		setIsLoading(false);
		setCurrentSessionId(newSessionId);
		historyCreatedRef.current = false; // Reset history flag
	};

	return {
		messages,
		isLoading,
		isLoadingHistory,
		error,
		sendMessage,
		resetChat,
		onHistoryCreated,
		loadHistoryMessages,
		currentSessionId,
	};
}
