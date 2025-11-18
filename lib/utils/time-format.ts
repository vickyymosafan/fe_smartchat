/**
 * Format seconds to MM:SS time string
 * @param seconds - Time in seconds
 * @returns Formatted time string (e.g., "2:05", "10:30")
 */
export function formatTime(seconds: number): string {
	if (!isFinite(seconds) || seconds < 0) {
		return "0:00"
	}

	const mins = Math.floor(seconds / 60)
	const secs = Math.floor(seconds % 60)
	return `${mins}:${secs.toString().padStart(2, "0")}`
}
