import { useState, useEffect, useCallback } from "react"
import {
	ChatHistory,
	createChatHistory,
	getChatHistories,
	renameChatHistory,
	deleteChatHistory,
} from "@/lib/chat-history-api"
import { getSessionId } from "@/lib/session"
import { handleError } from "@/lib/error-handler"
import type { CRUDHook } from "@/types/hooks"

interface CreateHistoryInput {
	firstMessage: string
}

interface UpdateHistoryInput {
	title: string
}

interface UseChatHistoryReturn extends Omit<CRUDHook<ChatHistory, CreateHistoryInput, UpdateHistoryInput>, 'data' | 'create' | 'update' | 'delete' | 'refresh'> {
	histories: ChatHistory[]
	createHistory: (firstMessage: string) => Promise<ChatHistory>
	renameHistory: (id: string, newTitle: string) => Promise<ChatHistory>
	deleteHistory: (id: string) => Promise<void>
	refreshHistories: () => Promise<void>
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
		async (firstMessage: string): Promise<ChatHistory> => {
			setError(null)
			const sessionId = getSessionId()
			const newHistory = await createChatHistory(sessionId, firstMessage)
			setHistories((prev) => [newHistory, ...prev])
			return newHistory
		},
		[]
	)

	const renameHistory = useCallback(async (id: string, newTitle: string): Promise<ChatHistory> => {
		setError(null)
		const updated = await renameChatHistory(id, newTitle)
		setHistories((prev) =>
			prev.map((h) => (h.id === id ? updated : h))
		)
		return updated
	}, [])

	const deleteHistory = useCallback(async (id: string): Promise<void> => {
		setError(null)
		await deleteChatHistory(id)
		setHistories((prev) => prev.filter((h) => h.id !== id))
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
