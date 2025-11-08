/**
 * Timestamp Component
 * Menampilkan waktu pesan dalam format yang mudah dibaca
 */

"use client";

import { formatTimestamp } from "@/lib/format";

/**
 * Props untuk Timestamp component
 */
interface TimestampProps {
	/** Date object yang akan diformat dan ditampilkan */
	timestamp: Date;
}

/**
 * Component untuk menampilkan timestamp pesan
 *
 * Responsibilities:
 * - Format and display timestamp
 * - Use lib/format.ts utility
 * - Apply appropriate styling
 * - Use semantic time element for accessibility
 *
 * @param props - TimestampProps berisi timestamp
 * @returns Formatted timestamp element
 *
 * @example
 * <Timestamp timestamp={new Date()} />
 */
export function Timestamp({ timestamp }: TimestampProps) {
	const formattedTime = formatTimestamp(timestamp);
	const isoTime = timestamp.toISOString();

	return (
		<time
			dateTime={isoTime}
			className="text-[11px] sm:text-xs text-neutral-500 mt-2 block text-right leading-tight"
			aria-label={`Dikirim pada ${formattedTime}`}
		>
			{formattedTime}
		</time>
	);
}
