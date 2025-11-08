/**
 * ChatBubble Component
 * Menampilkan bubble pesan chat dengan styling berbeda untuk setiap role
 */

"use client";

import { useState } from "react";
import type { ChatMessage } from "@/types/chat";
import { Timestamp } from "./Timestamp";

/**
 * Props untuk ChatBubble component
 */
interface ChatBubbleProps {
	/** Message object yang akan ditampilkan */
	message: ChatMessage;
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
export function ChatBubble({ message }: ChatBubbleProps) {
	const { role, content, timestamp } = message;
	const [copied, setCopied] = useState(false);
	const [showCopy, setShowCopy] = useState(false);

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
			onMouseEnter={() => setShowCopy(true)}
			onMouseLeave={() => setShowCopy(false)}
		>
			<div className={styles.bubble} role={role === "error" ? "alert" : undefined}>
				{/* Screen reader label untuk konteks pesan */}
				<span className="sr-only">{roleLabels[role]}: </span>

				{/* Copy button untuk AI messages */}
				{role === "ai" && (
					<button
						onClick={handleCopy}
						className={`absolute top-2 right-2 p-1.5 rounded-lg bg-white/80 hover:bg-white border border-neutral-200 transition-all duration-200 ${
							showCopy || copied ? "opacity-100" : "opacity-0"
						}`}
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

				{/*
					SECURITY: Content ditampilkan menggunakan React's JSX interpolation {content}
					React secara otomatis melakukan escaping untuk mencegah XSS attacks.
				*/}
				<p className={styles.text} style={{ textWrap: "balance" }}>
					{content}
				</p>

				{/* Timestamp hanya untuk user dan ai messages, tidak untuk error */}
				{(role === "user" || role === "ai") && <Timestamp timestamp={timestamp} />}

				{/* Feedback copied */}
				{copied && role === "ai" && (
					<span className="absolute -bottom-6 right-0 text-xs text-green-600 font-medium">
						Disalin
					</span>
				)}
			</div>
		</div>
	);
}
