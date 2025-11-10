/**
 * Auth service implementation
 * Concrete implementation of IAuthService interface
 */

import type { IAuthService } from "@/types/services"
import { API_BASE_URL, createHeaders } from "../api-config"

export class AuthService implements IAuthService {
	async verifyPin(pin: string): Promise<string> {
		try {
			const response = await fetch(`${API_BASE_URL}/api/auth/verify-pin`, {
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
}

// Export singleton instance
export const authService = new AuthService()
