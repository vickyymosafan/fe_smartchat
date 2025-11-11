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
		return window.sessionStorage.getItem(key)
	}

	setItem(key: string, value: string): void {
		if (typeof window === "undefined") return
		window.sessionStorage.setItem(key, value)
	}

	removeItem(key: string): void {
		if (typeof window === "undefined") return
		window.sessionStorage.removeItem(key)
	}
}

/**
 * LocalStorage implementation
 */
class LocalStorageAdapter implements IStorage {
	getItem(key: string): string | null {
		if (typeof window === "undefined") return null
		return window.localStorage.getItem(key)
	}

	setItem(key: string, value: string): void {
		if (typeof window === "undefined") return
		window.localStorage.setItem(key, value)
	}

	removeItem(key: string): void {
		if (typeof window === "undefined") return
		window.localStorage.removeItem(key)
	}
}

// Export singleton instances with different names to avoid shadowing global objects
export const sessionStorageAdapter = new SessionStorageAdapter()
export const localStorageAdapter = new LocalStorageAdapter()
