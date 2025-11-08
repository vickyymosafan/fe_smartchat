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

	// Validasi: cek apakah pesan valid (tidak kosong dan tidak hanya whitespace)
	const isMessageValid = message.trim().length > 0 && message.length <= 2000;

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
		<div className="border-t border-neutral-200 p-4">
			<div className="flex gap-2">
				<textarea
					ref={textareaRef}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Ketik pesan Anda..."
					rows={1}
					maxLength={2000}
					disabled={isLoading}
					aria-label="Kolom input pesan"
					aria-describedby="input-hint"
					className="flex-1 resize-none border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
				/>
				<button
					onClick={handleSubmit}
					disabled={!isMessageValid || isLoading}
					aria-label="Kirim pesan"
					aria-disabled={!isMessageValid || isLoading}
					className="min-w-[44px] min-h-[44px] bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Kirim
				</button>
			</div>
			{/* Screen reader hint untuk keyboard navigation */}
			<span id="input-hint" className="sr-only">
				Tekan Enter untuk mengirim, Shift+Enter untuk baris baru
			</span>
		</div>
	);
}
