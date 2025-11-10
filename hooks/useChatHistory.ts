/**
 * Chat History Hook
 * Manage chat history state and operations
 */

import { useState, useEffect, useCallback } from "react"
import {
	ChatHistory,
	createChatHistory,
	getChatHistories,
	renameChatHistory,
	deleteChatHistory,
} from "@/lib/chat-history-api"
import { getSessionId } from "@/lib/session"

interface UseChatHistoryReturn {
	histories: ChatHistory[]
	isLoading: boolean
	error: string | null
	createHistory: (firstMessage: string) => Promise<ChatHistory | null>
	renameHistory: (id: string, newTitle: string) => Promise<void>
	deleteHistory: (id: string) => Promise<void>
	refreshHistories: () => Promise<void>
}

export function useChatHistory(): UseChatHistoryReturn {
	const [histories, setHistories] = useState<ChatHistory[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// Load histories on mount
	const loadHistories = useCallback(async () => {
		try {
			setIsLoading(true)
			setError(null)
			const data = await getChatHistories()
			setHistories(data)
		} catch (err: any) {
			setError(err.message || "Failed to load chat histories")
			console.error("Failed to load histories:", err)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		loadHistories()
	}, [loadHistories])

	// Create new history
	const createHistory = useCallback(
		async (firstMessage: string): Promise<ChatHistory | null> => {
			try {
				setError(null)
				const sessionId = getSessionId()
				const newHistory = await createChatHistory(sessionId, firstMessage)
				setHistories((prev) => [newHistory, ...prev])
				return newHistory
			} catch (err: any) {
				setError(err.message || "Failed to create chat history")
				console.error("Failed to create history:", err)
				return null
			}
		},
		[]
	)

	// Rename history
	const renameHistory = useCallback(async (id: string, newTitle: string) => {
		try {
			setError(null)
			const updated = await renameChatHistory(id, newTitle)
			setHistories((prev) =>
				prev.map((h) => (h.id === id ? updated : h))
			)
		} catch (err: any) {
			setError(err.message || "Failed to rename chat history")
			console.error("Failed to rename history:", err)
			throw err
		}
	}, [])

	// Delete history
	const deleteHistory = useCallback(async (id: string) => {
		try {
			setError(null)
			await deleteChatHistory(id)
			setHistories((prev) => prev.filter((h) => h.id !== id))
		} catch (err: any) {
			setError(err.message || "Failed to delete chat history")
			console.error("Failed to delete history:", err)
			throw err
		}
	}, [])

	return {
		histories,
		isLoading,
		error,
		createHistory,
		renameHistory,
		deleteHistory,
		refreshHistories: loadHistories,
	}
}
