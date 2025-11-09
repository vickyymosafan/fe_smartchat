/**
 * Auth API Client
 * Handle authentication API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL tidak dikonfigurasi');
}

/**
 * Verify PIN code
 * 
 * @param pin - 6 digit PIN code
 * @returns Promise dengan token jika valid
 * @throws Error jika PIN invalid atau network error
 */
export async function verifyPin(pin: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/verify-pin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pin }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'PIN verification failed');
    }

    return data.data.token;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Terjadi kesalahan saat verifikasi PIN');
  }
}
