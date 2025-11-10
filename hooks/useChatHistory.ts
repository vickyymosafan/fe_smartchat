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

function handleError(err: any, defaultMessage: string): string {
	const message = err.message || defaultMessage
	console.error(defaultMessage, err)
	return message
}

export function useChatHistory(): UseChatHistoryReturn {
	const [histories, setHistories] = useState<ChatHistory[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const loadHistories = useCallback(async () => {
		try {
			setIsLoading(true)
			setError(null)
			const data = await getChatHistories()
			setHistories(data)
		} catch (err: any) {
			setError(handleError(err, "Failed to load chat histories"))
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		loadHistories()
	}, [loadHistories])

	const createHistory = useCallback(
		async (firstMessage: string): Promise<ChatHistory | null> => {
			try {
				setError(null)
				const sessionId = getSessionId()
				const newHistory = await createChatHistory(sessionId, firstMessage)
				setHistories((prev) => [newHistory, ...prev])
				return newHistory
			} catch (err: any) {
				setError(handleError(err, "Failed to create chat history"))
				return null
			}
		},
		[]
	)

	const renameHistory = useCallback(async (id: string, newTitle: string) => {
		try {
			setError(null)
			const updated = await renameChatHistory(id, newTitle)
			setHistories((prev) =>
				prev.map((h) => (h.id === id ? updated : h))
			)
		} catch (err: any) {
			setError(handleError(err, "Failed to rename chat history"))
			throw err
		}
	}, [])

	const deleteHistory = useCallback(async (id: string) => {
		try {
			setError(null)
			await deleteChatHistory(id)
			setHistories((prev) => prev.filter((h) => h.id !== id))
		} catch (err: any) {
			setError(handleError(err, "Failed to delete chat history"))
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
