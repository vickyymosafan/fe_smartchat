/**
 * ChatBubble Component
 * Menampilkan bubble pesan chat dengan styling berbeda untuk setiap role
 */

"use client";

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

	// Style mapping untuk setiap role (Open/Closed Principle)
	const roleStyles = {
		user: {
			wrapper: "flex justify-end",
			bubble: "max-w-[90%] sm:max-w-[80%] md:max-w-[70%] bg-blue-500 text-white rounded-2xl px-4 py-3",
			text: "text-base",
		},
		ai: {
			wrapper: "flex justify-start",
			bubble:
				"max-w-[90%] sm:max-w-[80%] md:max-w-[70%] bg-neutral-100 text-neutral-800 rounded-2xl px-4 py-3",
			text: "text-base",
		},
		error: {
			wrapper: "flex justify-center",
			bubble:
				"max-w-[90%] sm:max-w-[80%] md:max-w-[70%] bg-red-50 text-red-700 border border-red-200 rounded-2xl px-4 py-3",
			text: "text-sm",
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
		<div className={styles.wrapper}>
			<div className={styles.bubble} role={role === "error" ? "alert" : undefined}>
				{/* Screen reader label untuk konteks pesan */}
				<span className="sr-only">{roleLabels[role]}: </span>
				<p className={styles.text}>{content}</p>
				{/* Timestamp hanya untuk user dan ai messages, tidak untuk error */}
				{(role === "user" || role === "ai") && <Timestamp timestamp={timestamp} />}
			</div>
		</div>
	);
}
