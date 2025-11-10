"use client"

import { useState, useEffect, useRef } from "react"
import type { ChatMessage } from "@/types/chat"
import type { IChatService, IChatHistoryService } from "@/types/services"
import { chatService, chatHistoryService } from "@/lib/services"
import { createMessage } from "@/lib/message-factory"
import { resetSessionId } from "@/lib/session"

interface UseChatProps {
	onHistoryCreated?: () => void
	chatService?: IChatService
	chatHistoryService?: IChatHistoryService
}

interface UseChatReturn {
	messages: ChatMessage[]
	isLoading: boolean
	error: string | null
	sendMessage: (content: string) => Promise<void>
	resetChat: () => void
	isLoadingHistory: boolean
	loadHistoryMessages: (sessionId: string) => Promise<void>
	currentSessionId: string | null
}

export function useChat(props?: UseChatProps): UseChatReturn {
	const {
		onHistoryCreated,
		chatService: injectedChatService = chatService,
		chatHistoryService: injectedHistoryService = chatHistoryService,
	} = props || {}
	const [messages, setMessages] = useState<ChatMessage[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
	const historyCreatedRef = useRef<boolean>(false)

	useEffect(() => {
		const loadHistory = async () => {
			setIsLoadingHistory(true)
			try {
				const { getSessionId } = await import("@/lib/session")
				const sessionId = getSessionId()
				setCurrentSessionId(sessionId)
				
				const messages = await injectedChatService.loadHistory(sessionId)
				setMessages(messages)
				
				if (messages.length > 0) {
					historyCreatedRef.current = true
				}
			} catch (err) {
				console.error("Failed to load chat history:", err)
			} finally {
				setIsLoadingHistory(false)
			}
		}

		loadHistory()
	}, [injectedChatService])

	const sendMessage = async (content: string): Promise<void> => {
		const userMessage = createMessage("user", content)
		setMessages((prev) => [...prev, userMessage])
		setIsLoading(true)
		setError(null)

		try {
			const sessionId = currentSessionId || (await import("@/lib/session")).getSessionId()
			
			if (messages.length === 0 && !historyCreatedRef.current) {
				try {
					await injectedHistoryService.create(sessionId, content)
					historyCreatedRef.current = true
					
					if (onHistoryCreated) {
						onHistoryCreated()
					}
				} catch (historyError) {
					console.error("Failed to create chat history:", historyError)
				}
			}

			const aiResponse = await injectedChatService.sendMessage(content, sessionId)
			
			const aiMessage = createMessage("ai", aiResponse)
			setMessages((prev) => [...prev, aiMessage])
		} catch (error) {
			const errorContent = error instanceof Error ? error.message : "Terjadi kesalahan, silakan coba lagi"
			const errorMessage = createMessage("error", errorContent)
			
			setMessages((prev) => [...prev, errorMessage])
			setError(errorContent)
		} finally {
			setIsLoading(false)
		}
	}

	const loadHistoryMessages = async (sessionId: string): Promise<void> => {
		setIsLoadingHistory(true)
		setError(null)
		
		try {
			const messages = await injectedChatService.loadHistory(sessionId)
			setMessages(messages)
			setCurrentSessionId(sessionId)
			
			historyCreatedRef.current = messages.length > 0
			
			if (typeof window !== "undefined") {
				sessionStorage.setItem("chat_session_id", sessionId)
			}
		} catch (err) {
			console.error("Failed to load history messages:", err)
			setError("Gagal memuat riwayat chat")
		} finally {
			setIsLoadingHistory(false)
		}
	}

	const resetChat = (): void => {
		const newSessionId = resetSessionId()
		setMessages([])
		setError(null)
		setIsLoading(false)
		setCurrentSessionId(newSessionId)
		historyCreatedRef.current = false
	}

	return {
		messages,
		isLoading,
		isLoadingHistory,
		error,
		sendMessage,
		resetChat,
		loadHistoryMessages,
		currentSessionId,
	}
}
