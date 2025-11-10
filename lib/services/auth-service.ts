/**
 * Auth service implementation
 * Concrete implementation of IAuthService interface
 */

import type { IAuthService } from "@/types/services"
import { API_BASE_URL, createHeaders } from "../api-config"
import { fetchWithAuth } from "../api-interceptor"

export class AuthService implements IAuthService {
	async verifyPin(pin: string): Promise<string> {
		try {
			const response = await fetchWithAuth(`${API_BASE_URL}/api/auth/verify-pin`, {
				method: "POST",
				headers: createHeaders(false),
				body: JSON.stringify({ pin }),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || "PIN verification failed")
			}

			return data.data.token
		} catch (error) {
			if (error instanceof Error) {
				throw error
			}
			throw new Error("Terjadi kesalahan saat verifikasi PIN")
		}
	}

	async logout(): Promise<void> {
		try {
			await fetchWithAuth(`${API_BASE_URL}/api/auth/logout`, {
				method: "POST",
				headers: createHeaders(true),
			})
		} catch (error) {
			// Ignore errors on logout - token will be cleared client-side anyway
			console.warn("Logout request failed:", error)
		}
	}
}

// Export singleton instance
export const authService = new AuthService()
