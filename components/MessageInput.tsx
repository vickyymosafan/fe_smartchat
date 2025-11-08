/**
 * MessageInput Component
 * Menangani input pesan dari user dengan validasi dan keyboard handling
 */

"use client";

import { useState, useRef, type KeyboardEvent } from "react";

/**
 * Props untuk MessageInput component
 */
interface MessageInputProps {
	/** Callback function yang dipanggil ketika user mengirim pesan */
	onSend: (message: string) => void;

	/** Status loading untuk disable input saat mengirim pesan */
	isLoading: boolean;
}

/**
 * Component untuk input pesan chat
 *
 * Responsibilities:
 * - Controlled textarea input
 * - Handle Enter key (send) and Shift+Enter (newline)
 * - Validate input (not empty, max length)
 * - Call onSend callback
 * - Clear input after send
 * - Disable during loading
 *
 * @param props - MessageInputProps berisi onSend callback dan isLoading status
 * @returns Message input element with textarea and send button
 *
 * @example
 * <MessageInput onSend={handleSend} isLoading={false} />
 */
export function MessageInput({ onSend, isLoading }: MessageInputProps) {
	const [message, setMessage] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Auto-expand textarea
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
		
		// Reset height untuk recalculate
		e.target.style.height = "auto";
		// Set ke scrollHeight (max 200px)
		e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
	};

	// Validasi: cek apakah pesan valid (tidak kosong dan tidak hanya whitespace)
	const isMessageValid = message.trim().length > 0 && message.length <= 2000;

	// Hitung apakah perlu menampilkan character counter (ketika mendekati limit)
	const shouldShowCounter = message.length > 1800;

	// Tentukan warna counter berdasarkan jumlah karakter
	const getCounterColor = () => {
		if (message.length >= 1990) return "text-red-600";
		if (message.length >= 1900) return "text-amber-600";
		return "text-neutral-500";
	};

	/**
	 * Handle submit pesan
	 * Validasi input, panggil callback, clear input, dan focus kembali
	 */
	const handleSubmit = () => {
		if (!isMessageValid || isLoading) return;

		const trimmedMessage = message.trim();
		onSend(trimmedMessage);
		setMessage("");

		// Focus kembali ke textarea setelah submit
		textareaRef.current?.focus();
	};

	/**
	 * Handle keyboard events
	 * Enter: submit pesan
	 * Shift+Enter: insert newline (default behavior)
	 */
	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	return (
		<div className="border-t border-neutral-200 p-4 sm:p-5 md:p-6 bg-white">
			<div className="flex gap-2 sm:gap-3 items-end">
				<textarea
					ref={textareaRef}
					value={message}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					placeholder="Ketik pesan Anda..."
					rows={1}
					maxLength={2000}
					disabled={isLoading}
					aria-label="Kolom input pesan"
					aria-describedby="input-hint"
					className="flex-1 resize-none border border-neutral-300 rounded-xl px-4 py-3 text-[16px] font-normal leading-[1.7] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50 max-h-[200px] overflow-y-auto"
					style={{ minHeight: "48px" }}
				/>
				<button
					onClick={handleSubmit}
					disabled={!isMessageValid || isLoading}
					aria-label={isLoading ? "Mengirim pesan" : "Kirim pesan"}
					aria-disabled={!isMessageValid || isLoading}
					className="min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] px-4 bg-blue-500 text-white text-sm font-medium rounded-xl hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex-shrink-0"
				>
					{isLoading ? (
						<span className="flex items-center gap-2">
							<svg
								className="animate-spin h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
						</span>
					) : (
						"Kirim"
					)}
				</button>
			</div>

			{/* Character counter - tampil ketika mendekati limit */}
			{shouldShowCounter && (
				<div className="flex justify-end mt-2">
					<span
						className={`text-xs ${getCounterColor()} transition-colors duration-300`}
						aria-live="polite"
					>
						{message.length}/2000 karakter
					</span>
				</div>
			)}

			{/* Screen reader hint untuk keyboard navigation */}
			<span id="input-hint" className="sr-only">
				Tekan Enter untuk mengirim, Shift+Enter untuk baris baru
			</span>
		</div>
	);
}
