/**
 * Music service implementation
 * Fetches background music from backend API
 */

import { API_BASE_URL, createHeaders } from "../api-config"

export interface BackgroundMusic {
	id: string
	title: string
	artist?: string
	url: string
	isActive: boolean
	order: number
}

export class MusicService {
	async getAllMusic(): Promise<BackgroundMusic[]> {
		try {
			const response = await fetch(`${API_BASE_URL}/api/music`, {
				method: "GET",
				headers: createHeaders(),
			})

			if (!response.ok) {
				throw new Error(`Failed to fetch music: ${response.statusText}`)
			}

			const data = await response.json()
			return data.data?.music || []
		} catch (error) {
			console.error("[MusicService] Error fetching music:", error)
			return []
		}
	}

	async getRandomMusic(): Promise<BackgroundMusic | null> {
		try {
			const response = await fetch(`${API_BASE_URL}/api/music/random`, {
				method: "GET",
				headers: createHeaders(),
			})

			if (!response.ok) {
				return null
			}

			const data = await response.json()
			return data.data?.music || null
		} catch (error) {
			console.error("[MusicService] Error fetching random music:", error)
			return null
		}
	}
}

// Export singleton instance
export const musicService = new MusicService()
