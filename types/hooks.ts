/**
 * Base hook interfaces for LSP compliance
 * All hook implementations must follow these contracts
 */

/**
 * Base interface for hooks that manage async state
 */
export interface AsyncStateHook<T> {
	data: T
	isLoading: boolean
	error: string | null
}

/**
 * Base interface for hooks that manage collections
 */
export interface CollectionHook<T> extends AsyncStateHook<T[]> {
	refresh: () => Promise<void>
}

/**
 * Base interface for CRUD operations
 * All CRUD hooks must implement these consistently
 */
export interface CRUDHook<T, CreateInput, UpdateInput> extends CollectionHook<T> {
	create: (input: CreateInput) => Promise<T>
	update: (id: string, input: UpdateInput) => Promise<T>
	delete: (id: string) => Promise<void>
}

/**
 * Base interface for authentication hooks
 */
export interface AuthHook {
	isAuthenticated: boolean
	isLoading: boolean
	error: string | null
	login: (...args: any[]) => Promise<void>
	logout: () => void
}

/**
 * Base interface for chat hooks
 */
export interface ChatHook {
	messages: any[]
	isLoading: boolean
	error: string | null
	sendMessage: (content: string) => Promise<void>
	reset: () => void
}
