import { useState, useEffect, useCallback } from "react"
import type { IChatHistoryService, ChatHistory } from "@/types/services"
import { chatHistoryService } from "@/lib/services"
import { getSessionId } from "@/lib/session"
import { handleError } from "@/lib/error-handler"

interface UseChatHistoryProps {
	chatHistoryService?: IChatHistoryService
}

interface UseChatHistoryReturn {
	histories: ChatHistory[]
	isLoading: boolean
	error: string | null
	createHistory: (firstMessage: string) => Promise<ChatHistory>
	renameHistory: (id: string, newTitle: string) => Promise<ChatHistory>
	deleteHistory: (id: string) => Promise<void>
	refreshHistories: () => Promise<void>
}

export function useChatHistory(props?: UseChatHistoryProps): UseChatHistoryReturn {
	const { chatHistoryService: injectedService = chatHistoryService } = props || {}
	const [histories, setHistories] = useState<ChatHistory[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const loadHistories = useCallback(async () => {
		try {
			setIsLoading(true)
			setError(null)
			const data = await injectedService.getAll()
			setHistories(data)
		} catch (err: any) {
			setError(handleError(err, "Failed to load chat histories"))
		} finally {
			setIsLoading(false)
		}
	}, [injectedService])

	useEffect(() => {
		loadHistories()
	}, [loadHistories])

	const createHistory = useCallback(
		async (firstMessage: string): Promise<ChatHistory> => {
			setError(null)
			const sessionId = getSessionId()
			const newHistory = await injectedService.create(sessionId, firstMessage)
			setHistories((prev) => [newHistory, ...prev])
			return newHistory
		},
		[injectedService]
	)

	const renameHistory = useCallback(async (id: string, newTitle: string): Promise<ChatHistory> => {
		setError(null)
		const updated = await injectedService.rename(id, newTitle)
		setHistories((prev) =>
			prev.map((h) => (h.id === id ? updated : h))
		)
		return updated
	}, [injectedService])

	const deleteHistory = useCallback(async (id: string): Promise<void> => {
		setError(null)
		await injectedService.delete(id)
		setHistories((prev) => prev.filter((h) => h.id !== id))
	}, [injectedService])

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
