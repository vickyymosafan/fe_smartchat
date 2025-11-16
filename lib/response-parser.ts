/**
 * Response parser utility
 * Extracts AI response from various response formats
 * Follows SRP by separating parsing logic from service layer
 */

import type { ParsedAIResponse } from "@/types/chat"

/**
 * Extract content string from response data
 */
function extractContent(data: any): string {
	if (typeof data === "string") {
		return data
	}

	if (typeof data === "object" && data !== null) {
		// Try common response field names
		const fields = ["output", "message", "text", "response"]
		
		for (const field of fields) {
			if (field in data && typeof data[field] === "string") {
				return data[field]
			}
		}

		// Fallback to JSON string
		return JSON.stringify(data)
	}

	return String(data)
}

/**
 * Parse AI response with metadata
 * Returns content and cache status
 */
export function parseAIResponse(data: any): ParsedAIResponse {
	return {
		content: extractContent(data),
		fromCache: data?.fromCache || false,
	}
}
