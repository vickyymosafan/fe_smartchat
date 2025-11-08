/**
 * Date Utilities
 * Fungsi untuk format tanggal dan separator
 */

/**
 * Format tanggal untuk separator (Hari ini, Kemarin, atau tanggal lengkap)
 */
export function formatDateSeparator(date: Date): string {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const messageDate = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
	);

	const diffDays = Math.floor(
		(today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24),
	);

	if (diffDays === 0) return "Hari ini";
	if (diffDays === 1) return "Kemarin";

	// Format: Senin, 8 November 2025
	const dayNames = [
		"Minggu",
		"Senin",
		"Selasa",
		"Rabu",
		"Kamis",
		"Jumat",
		"Sabtu",
	];
	const monthNames = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];

	const dayName = dayNames[date.getDay()];
	const day = date.getDate();
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();

	return `${dayName}, ${day} ${month} ${year}`;
}

/**
 * Cek apakah dua tanggal berada di hari yang sama
 */
export function isSameDay(date1: Date, date2: Date): boolean {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
}

/**
 * Format timestamp relatif (Baru saja, 2 menit lalu, dll)
 */
export function formatRelativeTime(date: Date): string {
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffMinutes = Math.floor(diffMs / (1000 * 60));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

	if (diffMinutes < 1) return "Baru saja";
	if (diffMinutes === 1) return "1 menit lalu";
	if (diffMinutes < 60) return `${diffMinutes} menit lalu`;
	if (diffHours === 1) return "1 jam lalu";
	if (diffHours < 24) return `${diffHours} jam lalu`;

	// Format: 14:30
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	return `${hours}:${minutes}`;
}
