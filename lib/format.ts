/**
 * Utility functions untuk formatting data
 * Fungsi-fungsi pure tanpa side effects
 */

/**
 * Format timestamp menjadi string yang mudah dibaca dalam bahasa Indonesia
 * Menggunakan format relatif untuk pesan baru
 *
 * @param date - Date object yang akan diformat
 * @returns String terformat dalam bahasa Indonesia
 *
 * @example
 * formatTimestamp(new Date()) // "Baru saja"
 * formatTimestamp(new Date(Date.now() - 5 * 60 * 1000)) // "5 menit lalu"
 * formatTimestamp(new Date(Date.now() - 2 * 60 * 60 * 1000)) // "2 jam lalu"
 */
export function formatTimestamp(date: Date): string {
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffMinutes = Math.floor(diffMs / (1000 * 60));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

	// Baru saja (kurang dari 1 menit)
	if (diffMinutes < 1) {
		return "Baru saja";
	}

	// X menit lalu (kurang dari 1 jam)
	if (diffMinutes < 60) {
		return `${diffMinutes} menit lalu`;
	}

	// X jam lalu (kurang dari 24 jam)
	if (diffHours < 24) {
		return `${diffHours} jam lalu`;
	}

	// Format waktu: HH:MM
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	return `${hours}:${minutes}`;
}
