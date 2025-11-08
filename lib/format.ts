/**
 * Utility functions untuk formatting data
 * Fungsi-fungsi pure tanpa side effects
 */

/**
 * Format timestamp menjadi string yang mudah dibaca dalam bahasa Indonesia
 * Menangani relative time untuk pesan baru dan absolute time untuk pesan lama
 *
 * @param date - Date object yang akan diformat
 * @returns String terformat dalam bahasa Indonesia
 *
 * @example
 * formatTimestamp(new Date()) // "Baru saja"
 * formatTimestamp(new Date(Date.now() - 5 * 60 * 1000)) // "5 menit yang lalu"
 * formatTimestamp(new Date(Date.now() - 2 * 60 * 60 * 1000)) // "2 jam yang lalu"
 */
export function formatTimestamp(date: Date): string {
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffMinutes = Math.floor(diffMs / (1000 * 60));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	// Baru saja (kurang dari 1 menit)
	if (diffMinutes < 1) {
		return "Baru saja";
	}

	// X menit yang lalu (kurang dari 1 jam)
	if (diffMinutes < 60) {
		return `${diffMinutes} menit yang lalu`;
	}

	// X jam yang lalu (kurang dari 24 jam)
	if (diffHours < 24) {
		return `${diffHours} jam yang lalu`;
	}

	// Kemarin HH:MM (1 hari yang lalu)
	if (diffDays === 1) {
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		return `Kemarin ${hours}:${minutes}`;
	}

	// Format lengkap untuk pesan lebih lama: DD MMM YYYY HH:MM
	const day = date.getDate();
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"Mei",
		"Jun",
		"Jul",
		"Agu",
		"Sep",
		"Okt",
		"Nov",
		"Des",
	];
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");

	return `${day} ${month} ${year} ${hours}:${minutes}`;
}
