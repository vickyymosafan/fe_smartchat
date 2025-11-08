/**
 * MessageList Component
 * Menampilkan daftar pesan chat dengan auto-scroll dan typing indicator
 */

"use client";

import type { ChatMessage } from "@/types/chat";
import { ChatBubble } from "./ChatBubble";
import { TypingIndicator } from "./TypingIndicator";
import { ScrollToBottom } from "./ScrollToBottom";
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
		<div className="flex-1 relative overflow-hidden">
			<div
				ref={scrollRef}
				role="log"
				aria-live="polite"
				aria-atomic="false"
				aria-relevant="additions"
				className="h-full overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 scroll-smooth"
			>
				<div className="space-y-4">
					{/* Render semua messages dengan ChatBubble */}
					{messages.map((message) => (
						<div
							key={message.id}
							role="article"
							aria-label={`Pesan dari ${message.role}`}
							className="animate-fadeIn"
						>
							<ChatBubble message={message} />
						</div>
					))}

					{/* Tampilkan typing indicator ketika loading */}
					{isLoading && (
						<div className="animate-fadeIn">
							<TypingIndicator />
						</div>
					)}
				</div>
			</div>

			{/* Scroll to bottom button */}
			<ScrollToBottom scrollRef={scrollRef} messageCount={messages.length} />
		</div>
	);
}
