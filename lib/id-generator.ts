/**
 * Centralized ID generation utility
 * Provides consistent ID generation across the application
 */

/**
 * Generate a unique ID using timestamp and random string
 * Format: {timestamp}-{random}
 */
export function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Generate a unique ID with a prefix
 * Format: {prefix}-{timestamp}-{random}
 */
export function generateIdWithPrefix(prefix: string): string {
	return `${prefix}-${generateId()}`
}
