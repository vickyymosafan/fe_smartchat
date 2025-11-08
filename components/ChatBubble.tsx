/**
 * ChatBubble Component
 * Menampilkan bubble pesan chat dengan styling berbeda untuk setiap role
 */

"use client";

import { useState } from "react";
import type { ChatMessage } from "@/types/chat";
import { Timestamp } from "./Timestamp";
import { TextRenderer } from "./TextRenderer";

/**
 * Props untuk ChatBubble component
 */
interface ChatBubbleProps {
	/** Message object yang akan ditampilkan */
	message: ChatMessage;
	/** Callback untuk retry message */
	onRetry?: () => void;
	/** Apakah ini pesan user terakhir */
	isLastUserMessage?: boolean;
}

/**
 * Component untuk menampilkan single message bubble
 *
 * Responsibilities:
 * - Render message content
 * - Apply role-specific styling (user vs AI vs error)
 * - Render timestamp for user and AI messages
 * - Handle error message styling
 *
 * @param props - ChatBubbleProps berisi message
 * @returns Message bubble element
 *
 * @example
 * <ChatBubble message={message} />
 */
export function ChatBubble({
	message,
	onRetry,
	isLastUserMessage,
}: ChatBubbleProps) {
	const { role, content, timestamp } = message;
	const [copied, setCopied] = useState(false);
	const [showActions, setShowActions] = useState(false);

	// Handle copy to clipboard
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(content);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	// Style mapping untuk setiap role (Open/Closed Principle)
	const roleStyles = {
		user: {
			wrapper: "flex justify-end group",
			bubble:
				"relative max-w-[85%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] bg-blue-500 text-white rounded-2xl px-4 py-3 shadow-sm",
			text: "text-[16px] font-normal leading-[1.7]",
		},
		ai: {
			wrapper: "flex justify-start group",
			bubble:
				"relative max-w-[85%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] bg-neutral-50 text-neutral-900 rounded-2xl px-4 py-3 shadow-sm border border-neutral-200",
			text: "text-[16px] font-normal leading-[1.7]",
		},
		error: {
			wrapper: "flex justify-center group",
			bubble:
				"relative max-w-[85%] sm:max-w-[80%] md:max-w-[75%] bg-red-50 text-red-700 border border-red-200 rounded-2xl px-4 py-3 shadow-sm",
			text: "text-sm font-normal leading-[1.7]",
		},
	};

	// Label mapping untuk accessibility
	const roleLabels = {
		user: "Pesan Anda",
		ai: "Balasan AI",
		error: "Pesan error",
	};

	const styles = roleStyles[role];

	return (
		<div
			className={styles.wrapper}
			onMouseEnter={() => setShowActions(true)}
			onMouseLeave={() => setShowActions(false)}
		>
			<div className={styles.bubble} role={role === "error" ? "alert" : undefined}>
				<span className="sr-only">{roleLabels[role]}: </span>

				{/* Action buttons */}
				<div
					className={`absolute top-2 right-2 flex gap-1 transition-opacity duration-200 ${
						showActions || copied ? "opacity-100" : "opacity-0"
					}`}
				>
					{/* Copy button untuk AI */}
					{role === "ai" && (
						<button
							onClick={handleCopy}
							className="p-1.5 rounded-lg bg-white/90 hover:bg-white border border-neutral-200 transition-all duration-200"
							aria-label="Salin pesan"
							title={copied ? "Disalin!" : "Salin"}
						>
							{copied ? (
								<svg
									className="w-4 h-4 text-green-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							) : (
								<svg
									className="w-4 h-4 text-neutral-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
							)}
						</button>
					)}

					{/* Retry button untuk user terakhir */}
					{role === "user" && isLastUserMessage && onRetry && (
						<button
							onClick={onRetry}
							className="p-1.5 rounded-lg bg-white/90 hover:bg-white border border-neutral-200 transition-all duration-200"
							aria-label="Kirim ulang"
							title="Kirim ulang"
						>
							<svg
								className="w-4 h-4 text-neutral-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								/>
							</svg>
						</button>
					)}
				</div>

				{/* Render content dengan TextRenderer untuk AI, plain untuk user */}
				<div className={styles.text}>
					{role === "ai" ? (
						<TextRenderer content={content} />
					) : (
						<p style={{ textWrap: "balance" }}>{content}</p>
					)}
				</div>

				{/* Timestamp */}
				{(role === "user" || role === "ai") && <Timestamp timestamp={timestamp} />}
			</div>
		</div>
	);
}
