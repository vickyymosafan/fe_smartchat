/**
 * MessageList Component
 * Menampilkan daftar pesan chat dengan auto-scroll dan typing indicator
 */

"use client";

import type { ChatMessage } from "@/types/chat";
import { ChatBubble } from "./ChatBubble";
import { TypingIndicator } from "./TypingIndicator";
import { useAutoScroll } from "@/hooks/useAutoScroll";

/**
 * Props untuk MessageList component
 */
interface MessageListProps {
	/** Array of chat messages yang akan ditampilkan */
	messages: ChatMessage[];

	/** Status loading untuk menampilkan typing indicator */
	isLoading: boolean;
}

/**
 * Component untuk menampilkan list of messages
 *
 * Responsibilities:
 * - Render array of messages
 * - Apply consistent spacing
 * - Show typing indicator when loading
 * - Use useAutoScroll hook for automatic scrolling
 * - Implement ARIA live region for accessibility
 *
 * @param props - MessageListProps berisi messages dan isLoading
 * @returns Message list element with auto-scroll
 *
 * @example
 * <MessageList messages={messages} isLoading={isLoading} />
 */
export function MessageList({ messages, isLoading }: MessageListProps) {
	// Use auto-scroll hook untuk scroll otomatis ke pesan terbaru
	const { scrollRef } = useAutoScroll(messages);

	return (
		<div
			ref={scrollRef}
			role="log"
			aria-live="polite"
			aria-atomic="false"
			aria-relevant="additions"
			className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8"
		>
			<div className="space-y-3 sm:space-y-4">
				{/* Render semua messages dengan ChatBubble */}
				{messages.map((message) => (
					<div
						key={message.id}
						role="article"
						aria-label={`Pesan dari ${message.role}`}
					>
						<ChatBubble message={message} />
					</div>
				))}

				{/* Tampilkan typing indicator ketika loading */}
				{isLoading && <TypingIndicator />}
			</div>
		</div>
	);
}
