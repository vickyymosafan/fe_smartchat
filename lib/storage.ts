/**
 * Storage abstraction layer
 * Implements DIP by providing abstraction over browser storage APIs
 * Makes code testable and allows easy storage strategy changes
 */

export interface IStorage {
	getItem(key: string): string | null
	setItem(key: string, value: string): void
	removeItem(key: string): void
}

/**
 * SessionStorage implementation
 */
class SessionStorageAdapter implements IStorage {
	getItem(key: string): string | null {
		if (typeof window === "undefined") return null
		return sessionStorage.getItem(key)
	}

	setItem(key: string, value: string): void {
		if (typeof window === "undefined") return
		sessionStorage.setItem(key, value)
	}

	removeItem(key: string): void {
		if (typeof window === "undefined") return
		sessionStorage.removeItem(key)
	}
}

/**
 * LocalStorage implementation
 */
class LocalStorageAdapter implements IStorage {
	getItem(key: string): string | null {
		if (typeof window === "undefined") return null
		return localStorage.getItem(key)
	}

	setItem(key: string, value: string): void {
		if (typeof window === "undefined") return
		localStorage.setItem(key, value)
	}

	removeItem(key: string): void {
		if (typeof window === "undefined") return
		localStorage.removeItem(key)
	}
}

// Export singleton instances
export const sessionStorage = new SessionStorageAdapter()
export const localStorage = new LocalStorageAdapter()
